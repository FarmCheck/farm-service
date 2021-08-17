import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { TargetTypeRepository } from '../../repositories';
import { TargetType } from '../../models';
import { CListData, ICrudOption } from '../index';

@Entity()
export class TargetTypeService {
    constructor(
        @OrmRepository()
        private targetTypeRepository: TargetTypeRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<TargetType> | undefined> {
        this.log.info('Find all target type');
        const list = await this.targetTypeRepository.findAndCount({
            skip: option.skip,
            take: option.take,
            select: option.select,
            where: option.where,
            relations: option.relations,
            order: option.order,
        });

        return { list: list[0], count: list[1] };
    }

    public async create(
        targetType: TargetType,
        option?: ICrudOption
    ): Promise<TargetType> {
        this.log.info('Create a new target type');
        targetType.id = uuid.v1();

        return this.targetTypeRepository.save(targetType);
    }

    public findOne(
        id: string,
        option?: ICrudOption
    ): Promise<TargetType> {
        this.log.info('Find one target type');
        return this.targetTypeRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        targetType: object,
        option?: ICrudOption
    ): Promise<TargetType | undefined> {
        this.log.info('Update some fields a target type');
        await this.targetTypeRepository.update(
            id,
            targetType
        );
        return this.targetTypeRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<TargetType | undefined> {
        this.log.info('Delete a target type');
        const item = await this.targetTypeRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.targetTypeRepository.delete(id);

        return item;
    }
}
