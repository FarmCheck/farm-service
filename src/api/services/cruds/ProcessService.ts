import { Entity, FindOneOptions, getConnection, Like, QueryRunner } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { ProcessRepository } from '../../repositories';
import { Process } from '../../models';
import { CListData, ICrudOption } from '../index';
import { Helper } from '../../../common';
import { DbHelper } from '../common';

@Entity()
export class ProcessService {
    constructor(
        @OrmRepository()
        private processRepository: ProcessRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option: ICrudOption = {}
    ): Promise<CListData<Process> | undefined> {
        this.log.info('Find all process');

        return this.dbHelper.findAndCount(this.processRepository, option);
    }

    public async getValidCodeInTransaction(
        queryRunner: QueryRunner,
        process: Process
    ): Promise<string> {
        const prefixCode = await Helper.combineFirstCharacterAndLastWord(process.name);
        const findOneOptions: FindOneOptions<Process> = {
            where: { code: Like(`${prefixCode}%`) },
            order: { createdAt: 'DESC' },
            select: ['code'],
        };

        return this.dbHelper.getValidCodeInTransaction(queryRunner, Process, findOneOptions, prefixCode, 4);
    }

    public async create(process: Process, option: ICrudOption = {}): Promise<Process> {
        this.log.info('Create a new process');
        process.id = uuid.v1();
        process.productObjectsTotal = 0;
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            process.code = process.code ?? await this.getValidCodeInTransaction(queryRunner, process);
            const result = await queryRunner.manager.save(process);

            await queryRunner.commitTransaction();

            return result;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }

        return this.processRepository.save(process);
    }

    public findOne(id: string, option: ICrudOption = {}): Promise<Process> {
        this.log.info('Find one process');

        // if (option.relations && option.relations.length !== 0) {
        //     option.relations.push('steps');
        //     option.relations.push('steps.stepProperties');
        // } else {
        //     option.relations = ['steps', 'steps.stepProperties'];
        // }

        return this.processRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        process: Process,
        option?: ICrudOption
    ): Promise<Process | undefined> {
        this.log.info('Update some fields a process');
        delete process.productObjectsTotal;
        await this.processRepository.update(id, process);
        return this.processRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Process | undefined> {
        this.log.info('Delete a process');
        const item = await this.processRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.processRepository.delete(id);

        return item;
    }
}
