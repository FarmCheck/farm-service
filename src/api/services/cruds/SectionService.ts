import { Entity, FindOneOptions, getConnection, Like, QueryRunner } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import _ from 'lodash';
import uuid from 'uuid';

import { DiaryRepository, SectionRepository, StepRepository } from '../../repositories';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Diary, Section } from '../../models';
import { CListData, ICrudOption } from '../base';
import { TendermintService } from '../blockchain/TendermintService';
import { Helper } from '../../../common';
import { DbHelper } from '../common';
import { DiariesPortalResponse } from '../../controllers/responses/PortalResponse';

@Entity()
@Service()
export class SectionService {
    constructor(
        @OrmRepository()
        private sectionRepository: SectionRepository,
        @OrmRepository()
        private readonly diaryRepository: DiaryRepository,
        @OrmRepository()
        private readonly stepRepository: StepRepository,

        private dbHelper: DbHelper,
        private readonly tendermintService: TendermintService,
        @Logger(__filename) private log: LoggerInterface
    ) {
    }

    public async find(
        option: ICrudOption = {}
    ): Promise<CListData<Section> | undefined> {
        this.log.info('Find all section');

        return await this.dbHelper.findAndCount(this.sectionRepository, option);
    }

    public async getValidCodeInTransaction(
        queryRunner: QueryRunner,
        section: Section
    ): Promise<string> {
        const prefixCode = await Helper.combineFirstCharacterAndLastWord(section.name);
        const findOneOptions: FindOneOptions<Section> = {
            where: { code: Like(`${prefixCode}%`) },
            order: { createdAt: 'DESC' },
            select: ['code'],
        };

        return this.dbHelper.getValidCodeInTransaction(queryRunner, Section, findOneOptions, prefixCode, 4);
    }

    public async create(section: Section, option: ICrudOption = {}): Promise<Section> {
        this.log.info('Create a new section');
        section.id = uuid.v1();
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            section.code = section.code ?? await this.getValidCodeInTransaction(queryRunner, section);
            section.diariesTotal = 0;
            const result = await queryRunner.manager.save(section);

            await queryRunner.commitTransaction();

            return result;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }

        return this.sectionRepository.save(section);
    }

    public async findOne(id: string, option: ICrudOption = {}): Promise<Section> {
        this.log.info('Find one section');

        if (option.relations && option.relations.length !== 0) {
            option.relations.push('area');
            option.relations.push('productObject');
            option.relations.push('process');
        } else {
            option.relations = ['area', 'productObject', 'process'];
        }

        const section = await this.sectionRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });

        _.assign(section, {
            areaName: section.area.name,
            productObjectName: section.productObject.name,
            processName: section.process.name,
            typeName: section.type === 0 ? 'season' : 'batch',
        });

        delete section.area;
        delete section.process;
        delete section.productObject;

        return section;
    }

    public async update(
        id: string,
        section: Section,
        option?: ICrudOption
    ): Promise<Section | undefined> {
        this.log.info('Update some fields a section');
        delete section.diariesTotal;
        await this.sectionRepository.update(id, section);
        return this.sectionRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Section | undefined> {
        this.log.info('Delete a section');
        const item = await this.sectionRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.sectionRepository.delete(id);

        return item;
    }

    public async findStepsWithDiaries(
        sectionID: string
    ): Promise<DiariesPortalResponse | undefined> {
        this.log.info('Find steps with diaries by section');
        const section = await this.sectionRepository
            .findOne(sectionID, {
                relations: ['process'],
            });
        if (!section) {
            return undefined;
        }

        const steps = await this.stepRepository
            .createQueryBuilder('step')
            .innerJoin(
                'step.diaries',
                'd',
                'd.stepID = step.id AND d.sectionID = :sectionID',
                { sectionID }
            )
            .where('step.processID = :processID', { processID: section.processID })
            .distinct(true)
            .cache(10 * 1000)
            .orderBy('step.order', 'ASC')
            .getMany();

        /**
         * TODO: optimize this
         * N + 1 problem
         * there will be 5-10 steps each process, so will be 10 + 1 select query
         * select each step seem faster and less complex than joining table with `diary`
         */
        await Promise.all(steps.map(async (step, idx) => {
             const diaries = await this.diaryRepository
                .createQueryBuilder('d')
                .where('d.stepID = :stepID', { stepID: step.id })
                .andWhere('d.sectionID = :sectionID', { sectionID })
                .leftJoinAndSelect('d.hash', 'hash')
                .orderBy('d.createdAt', 'DESC')
                .cache(10 * 1000)
                .take(1)
                .getMany();
            steps[idx].diaries = diaries;
        }));

        return new DiariesPortalResponse({
            process: section.process,
            steps: steps as any[], // skip type-check
            section,
        });
    }

    public async recheckDiariesByStep(sectionID: string, stepID: string, options?: ICrudOption): Promise<CListData<Diary>> {
        const [
            [list, count],
            nodesList,
        ] = await Promise.all([
            this.diaryRepository.findAndCount({
                ...options,
                where: {
                    ...options.where || {},
                    stepID,
                    sectionID,
                },
            }),
            this.tendermintService.queryDiary(
                ['section_id', sectionID],
                ['step_id', stepID]
            ),
        ]);

        const checkedList = list.map((diary) => {
            const nodeDiaryIdx = nodesList
                .findIndex(_nodeDiary => _nodeDiary.id === diary.id);
            diary.hash = nodeDiaryIdx > -1
                ? nodesList[nodeDiaryIdx].hash
                : undefined;
            return diary;
        });

        return {
            list: checkedList,
            count,
        };
    }
}
