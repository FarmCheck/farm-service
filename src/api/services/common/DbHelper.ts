import { EntityTarget, FindOneOptions, ILike, QueryRunner, Repository } from 'typeorm';
import { normalize } from 'normalize-diacritics';
import { ConditionQueryBuilder } from './ConditionQueryBuilder';
import { assign as _assign } from 'lodash';
import { CListData, ICrudOption } from '../base';

export class DbHelper {
    public async getValidCodeInTransaction(
        queryRunner: QueryRunner,
        entityClass: EntityTarget<any>,
        options: FindOneOptions = {},
        prefix: string,
        autoFill: number = 4
    ): Promise<string> {
        const entity = await queryRunner.manager.findOne(entityClass, options);

        if (!entity) {
            return `${prefix}-${'1'.padStart(autoFill, '0')}`;
        }

        const parts = entity.code.split('-');
        const index = +parts[parts.length - 1] + 1;

        return `${prefix}-${index.toString().padStart(autoFill, '0')}`;
    }

    public async findAndCount(
        dbRepository: Repository<any>,
        option: ICrudOption = {}): Promise<CListData<any> | undefined> {
        let needMedias = false;

        if (option.relations && option.relations.includes('medias')) {
            needMedias = true;
            const index = option.relations.indexOf('medias');
            option.relations[index] = 'mediaAbles';
            option.relations.push('mediaAbles.media');
        }

        /**
         * Because condition parser will be made some `JOIN` and `SELECT` query inside
         * So I need to customize the query builder to handle the condition logic
         * Example: `{product: {price: {gt: 100}}}` will `JOIN` `product` table and `SELECT` `price` column
         */
        const query = ConditionQueryBuilder.ofRepository(dbRepository)
            .select(option.select)
            .relations(option.relations)
            .search(option.search)
            .condition(option.where)
            .order(option.order)
            .take(option.take)
            .skip(option.skip)
            .build();

        const [list, count] = await query.getManyAndCount();

        if (needMedias) {
            for (const element of list) {
                const medias = [];

                for (const mediaAble of element.mediaAbles) {
                    medias.push({
                        id: mediaAble.media.id,
                        type: mediaAble.media.type,
                        url: mediaAble.media.url,
                        urlThumbnail: mediaAble.media.urlThumbnail,
                        createdAt: mediaAble.media.createdAt,
                    });
                }

                _assign(element, { medias });
            }
        }

        return { list, count };
    }

    public async count(
        dbRepository: Repository<any>,
        option: ICrudOption = {}): Promise<number | undefined> {

        if (option.relations && option.relations.includes('medias')) {
            const index = option.relations.indexOf('medias');
            option.relations[index] = 'mediaAbles';
            option.relations.push('mediaAbles.media');
        }

        /**
         * Because condition parser will be made some `JOIN` and `SELECT` query inside
         * So I need to customize the query builder to handle the condition logic
         * Example: `{product: {price: {gt: 100}}}` will `JOIN` `product` table and `SELECT` `price` column
         */
        const query = ConditionQueryBuilder.ofRepository(dbRepository)
            .select(option.select)
            .order(option.order)
            .take(option.take)
            .skip(option.skip)
            .condition(option.where)
            .search(option.search)
            .relations(option.relations)
            .build();

        const count = await query.getCount();

        return count;
    }

    public async findOne(
        dbRepository: Repository<any>,
        id: string,
        option: ICrudOption = {}): Promise<any | undefined> {

        let needMedias = false;

        if (option.relations && option.relations.includes('medias')) {
            needMedias = true;
            const index = option.relations.indexOf('medias');
            option.relations[index] = 'mediaAbles';
            option.relations.push('mediaAbles.media');
        }

        const result =  await dbRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
            cache: option.cache,
        });

        if (!result) {
            return undefined;
        }

        if (needMedias) {
            const medias = [];

            for (const mediaAble of result.mediaAbles) {
                medias.push({
                    id: mediaAble.media.id,
                    type: mediaAble.media.type,
                    url: mediaAble.media.url,
                    urlThumbnail: mediaAble.media.urlThumbnail,
                    createdAt: mediaAble.media.createdAt,
                });
            }

            _assign(result, { medias });
        }

        return result;
    }

    /**
     * This is Nghia's code
     *
     * Temp move here to backup when error happens on main function
     */
    public async oldFindAndCount(
        dbRepository: Repository<any>,
        option: ICrudOption = {}): Promise<CListData<any> | undefined> {

        // Query full text search if has search text
        if (option.search) {
            const searchText = await normalize(option.search.trim());

            if (searchText && option.where) {
                _assign(option.where, {
                    fullTextSearch: ILike(`%${searchText}%`),
                });
            } else if (searchText) {
                option.where = { fullTextSearch: ILike(`%${searchText}%`) };
            }
        }

        let needMedias = false;

        if (option.relations && option.relations.includes('medias')) {
            needMedias = true;
            const index = option.relations.indexOf('medias');
            option.relations[index] = 'mediaAbles';
            option.relations.push('mediaAbles.media');
        }

        const [list,  count] = await dbRepository.findAndCount({
            skip: option.skip,
            take: option.take,
            select: option.select,
            where: option.where,
            relations: option.relations,
            order: option.order,
            cache: option.cache,
        });

        if (needMedias) {
            for (const element of list) {
                const medias = [];

                for (const mediaAble of element.mediaAbles) {
                    medias.push({
                        id: mediaAble.media.id,
                        type: mediaAble.media.type,
                        url: mediaAble.media.url,
                        urlThumbnail: mediaAble.media.urlThumbnail,
                        createdAt: mediaAble.media.createdAt,
                    });
                }

                _assign(element, { medias });
            }
        }

        return { list, count };
    }
}
