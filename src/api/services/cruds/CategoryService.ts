import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { CategoryRepository } from '../../repositories';
import { Category } from '../../models';
import { CListData, ICrudOption } from '../index';
import { Helper } from '../../../common';

@Entity()
export class CategoryService {
    constructor(
        @OrmRepository()
        private categoryRepository: CategoryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<Category> | undefined> {
        this.log.info('Find all category');
        const list = await this.categoryRepository.findAndCount({
            skip: option.skip,
            take: option.take,
            select: option.select,
            where: option.where,
            relations: option.relations,
            order: option.order,
            cache: true,
        });

        return { list: list[0], count: list[1] };
    }

    public async getValidCodeInTransaction(
        category: Category
    ): Promise<string> {
        return Helper.combineFirstCharacterAndLastWord(category.name);
    }

    public async create(
        category: Category,
        option?: ICrudOption
    ): Promise<Category> {
        this.log.info('Create a new category');
        category.id = uuid.v1();
        category.code = category.code ?? await this.getValidCodeInTransaction(category);

        return this.categoryRepository.save(category);
    }

    public findOne(
        id: string,
        option?: ICrudOption
    ): Promise<Category> {
        this.log.info('Find one category');
        return this.categoryRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        category: object,
        option?: ICrudOption
    ): Promise<Category | undefined> {
        this.log.info('Update some fields a category');
        await this.categoryRepository.update(
            id,
            category
        );
        return this.categoryRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Category | undefined> {
        this.log.info('Delete a category');
        const item = await this.categoryRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.categoryRepository.delete(id);

        return item;
    }
}
