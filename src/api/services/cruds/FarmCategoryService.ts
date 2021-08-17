import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { FarmCategoryRepository } from '../../repositories';
import { FarmCategory } from '../../models';
import { CListData, ICrudOption } from '../index';

@Entity()
export class FarmCategoryService {
    constructor(
        @OrmRepository()
        private farmCategoryRepository: FarmCategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<FarmCategory> | undefined> {
        this.log.info('Find all farm category');
        const list = await this.farmCategoryRepository.findAndCount({
            skip: option.skip,
            take: option.take,
            select: option.select,
            where: option.where,
            relations: option.relations,
            order: option.order,
        });

        return { list: list[0], count: list[1] };
    }

    public create(
        farmCategory: FarmCategory,
        option?: ICrudOption
    ): Promise<FarmCategory> {
        this.log.info('Create a new farm category');
        farmCategory.id = uuid.v1();
        return this.farmCategoryRepository.save(farmCategory);
    }

    public findOne(id: string, option?: ICrudOption): Promise<FarmCategory> {
        this.log.info('Find one farm category');
        return this.farmCategoryRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        farmCategory: object,
        option?: ICrudOption
    ): Promise<FarmCategory | undefined> {
        this.log.info('Update some fields a farm category');
        await this.farmCategoryRepository.update(id, farmCategory);
        return this.farmCategoryRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<FarmCategory | undefined> {
        this.log.info('Delete a farm category');
        const item = await this.farmCategoryRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.farmCategoryRepository.delete(id);

        return item;
    }
}
