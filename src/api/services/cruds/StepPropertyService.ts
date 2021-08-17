import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { StepPropertyRepository } from '../../repositories';
import { StepProperty } from '../../models';
import { CListData, ICrudOption } from '../index';
import { DbHelper } from '../common';

@Entity()
export class StepPropertyService {
    constructor(
        @OrmRepository()
        private stepPropertyRepository: StepPropertyRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<StepProperty> | undefined> {
        this.log.info('Find all step property');

        return await this.dbHelper.findAndCount(this.stepPropertyRepository, option);
    }

    public create(
        stepProperty: StepProperty,
        option?: ICrudOption
    ): Promise<StepProperty> {
        this.log.info('Create a new step property');
        stepProperty.id = uuid.v1();
        return this.stepPropertyRepository.save(stepProperty);
    }

    public findOne(id: string, option?: ICrudOption): Promise<StepProperty> {
        this.log.info('Find one step property');
        return this.stepPropertyRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        stepProperty: object,
        option?: ICrudOption
    ): Promise<StepProperty | undefined> {
        this.log.info('Update some fields a step property');
        await this.stepPropertyRepository.update(id, stepProperty);
        return this.stepPropertyRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<StepProperty | undefined> {
        this.log.info('Delete a step property');
        const item = await this.stepPropertyRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.stepPropertyRepository.delete(id);

        return item;
    }
}
