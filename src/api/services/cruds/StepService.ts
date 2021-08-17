import { Entity, getConnection } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { StepRepository } from '../../repositories';
import { Step, StepProperty } from '../../models';
import { CListData, ICrudOption } from '../index';
import { CreateStepPropertyBody } from '../../controllers/requests';
import _ from 'lodash';
import { DbHelper } from '../common';

@Entity()
export class StepService {
    constructor(
        @OrmRepository()
        private stepRepository: StepRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option: ICrudOption = {}
    ): Promise<CListData<Step> | undefined> {
        this.log.info('Find all step');

        return await this.dbHelper.findAndCount(this.stepRepository, option);
    }

    public async create(
        step: Step,
        stepProperties: CreateStepPropertyBody[],
        option?: ICrudOption): Promise<Step> {
        this.log.info('Create a new step');
        step.id = uuid.v1();
        step.diariesTotal = 0;
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await queryRunner.manager.save(step);

            if (stepProperties && stepProperties.length !== 0) {
                const waiters = [];

                for (const stepProperty of stepProperties) {
                    const stepPropertyEntity = new StepProperty();
                    _.assign(stepPropertyEntity, stepProperty);
                    stepPropertyEntity.id = uuid.v1();
                    stepPropertyEntity.stepID = result.id;
                    waiters.push(queryRunner.manager.save(stepPropertyEntity));
                }

                await Promise.all(waiters);
            }

            await queryRunner.commitTransaction();

            return result;
        } catch (err: any) {
            await queryRunner.rollbackTransaction();
            throw  err;
        } finally {
            await queryRunner.release();
        }
    }

    public findOne(id: string, option?: ICrudOption): Promise<Step> {
        this.log.info('Find one step');
        return this.stepRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        step: object,
        option?: ICrudOption
    ): Promise<Step | undefined> {
        this.log.info('Update some fields a step');
        await this.stepRepository.update(id, step);
        return this.stepRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Step | undefined> {
        this.log.info('Delete a step');
        const item = await this.stepRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.stepRepository.delete(id);

        return item;
    }
}
