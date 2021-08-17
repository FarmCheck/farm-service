import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { SubCategoryRepository } from '../../repositories';
import { SubCategory } from '../../models';
import { CListData, ICrudOption } from '../index';
import { Helper } from '../../../common';

@Entity()
export class SubCategoryService {
    constructor(
        @OrmRepository()
        private subCategoryRepository: SubCategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<SubCategory> | undefined> {
        this.log.info('Find all sub category');
        const list = await this.subCategoryRepository.findAndCount({
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
        subCategory: SubCategory,
        option?: ICrudOption
    ): Promise<SubCategory> {
        this.log.info('Create a new sub category');
        subCategory.id = uuid.v1();
        subCategory.code = subCategory.code ?? await Helper.combineFirstCharacterAndLastWord(subCategory.name);

        return this.subCategoryRepository.save(subCategory);
    }

    public findOne(
        id: string,
        option?: ICrudOption
    ): Promise<SubCategory> {
        this.log.info('Find one sub category');
        return this.subCategoryRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        subCategory: object,
        option?: ICrudOption
    ): Promise<SubCategory | undefined> {
        this.log.info('Update some fields a sub category');
        await this.subCategoryRepository.update(
            id,
            subCategory
        );
        return this.subCategoryRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<SubCategory | undefined> {
        this.log.info('Delete a sub category');
        const item = await this.subCategoryRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.subCategoryRepository.delete(id);

        return item;
    }
}
