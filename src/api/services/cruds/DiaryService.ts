import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { DiaryRepository, SectionRepository } from '../../repositories';
import { Diary, Section, Step } from '../../models';
import { CListData, ICrudOption } from '../base';
import { TendermintService } from '../blockchain/TendermintService';
import { DiaryHashPushError } from '../../errors/Diary/DiaryHashPushError';
import { Service } from 'typedi';
import { DbHelper } from '../common';
import { BadRequestError } from 'routing-controllers';
import { getConnection, QueryRunner } from 'typeorm';

@Service()
export class DiaryService {
    constructor(
        @OrmRepository()
        private diaryRepository: DiaryRepository,
        @OrmRepository()
        private sectionRepository: SectionRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface,
        private readonly pushDiaryService: TendermintService
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<Diary> | undefined> {
        this.log.info('Find all diary');

        return await this.dbHelper.findAndCount(this.diaryRepository, option);
    }

    public async create(diary: Diary, productObjectID: string, option?: ICrudOption): Promise<Diary> {
        this.log.info('Create a new diary');

        diary.id = uuid.v1();

        if (!diary.sectionID && !productObjectID || diary.sectionID && productObjectID) {
            throw new BadRequestError('Invalid data');
        }

        if (productObjectID) {
           const sections = await this.sectionRepository.find({ where: { 'productObjectID': productObjectID, 'status': 0 } });

           if (sections.length) {
               const { id: sectionID } = sections[0];
               diary.sectionID = sectionID;
           } else {
               throw new BadRequestError('Invalid section data');
           }
        }
        let savedDiary: Diary;

        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            savedDiary = await queryRunner.manager.save(diary);
            await this.changeDiariesTotal(queryRunner, savedDiary, 1);
            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }

        try {
            // TODO: replace any to real user
            return await this.pushDiaryService.push(savedDiary, {} as any, 'CREATE');
        } catch (error) {
            if (error instanceof DiaryHashPushError) {
                return savedDiary;
            }
            throw error;
        }
    }

    public findOne(id: string, option?: ICrudOption): Promise<Diary> {
        this.log.info('Find one diary');
        return this.diaryRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        diary: object,
        option?: ICrudOption
    ): Promise<Diary | undefined> {
        this.log.info('Update some fields a diary');
        await this.diaryRepository.update(id, diary);
        const savedDiary = await this.diaryRepository.findOne(id);
        try {
            // TODO: replace any to real user
            return await this.pushDiaryService.push(savedDiary, {} as any, 'UPDATE');
        } catch (error) {
            if (error instanceof DiaryHashPushError) {
                return savedDiary;
            }
            throw error;
        }
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Diary | undefined> {
        this.log.info('Delete a diary');
        const item = await this.diaryRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            await queryRunner.manager.softDelete(Diary, id);
            await this.changeDiariesTotal(queryRunner, item, -1);
            return item;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }
    }

    private async changeDiariesTotal(
        queryRunner: QueryRunner,
        entity: Diary,
        amount: number
    ): Promise<void> {
        const field = `diariesTotal`;
        await queryRunner.manager.increment(Step, { id: entity.stepID }, field, amount);
        await queryRunner.manager.increment(Section, { id: entity.sectionID }, field, amount);
    }
}
