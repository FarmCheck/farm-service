"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbHelper = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const normalize_diacritics_1 = require("normalize-diacritics");
const ConditionQueryBuilder_1 = require("./ConditionQueryBuilder");
const lodash_1 = require("lodash");
class DbHelper {
    getValidCodeInTransaction(queryRunner, entityClass, options = {}, prefix, autoFill = 4) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const entity = yield queryRunner.manager.findOne(entityClass, options);
            if (!entity) {
                return `${prefix}-${'1'.padStart(autoFill, '0')}`;
            }
            const parts = entity.code.split('-');
            const index = +parts[parts.length - 1] + 1;
            return `${prefix}-${index.toString().padStart(autoFill, '0')}`;
        });
    }
    findAndCount(dbRepository, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const query = ConditionQueryBuilder_1.ConditionQueryBuilder.ofRepository(dbRepository)
                .select(option.select)
                .relations(option.relations)
                .search(option.search)
                .condition(option.where)
                .order(option.order)
                .take(option.take)
                .skip(option.skip)
                .build();
            const [list, count] = yield query.getManyAndCount();
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
                    lodash_1.assign(element, { medias });
                }
            }
            return { list, count };
        });
    }
    count(dbRepository, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const query = ConditionQueryBuilder_1.ConditionQueryBuilder.ofRepository(dbRepository)
                .select(option.select)
                .order(option.order)
                .take(option.take)
                .skip(option.skip)
                .condition(option.where)
                .search(option.search)
                .relations(option.relations)
                .build();
            const count = yield query.getCount();
            return count;
        });
    }
    findOne(dbRepository, id, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let needMedias = false;
            if (option.relations && option.relations.includes('medias')) {
                needMedias = true;
                const index = option.relations.indexOf('medias');
                option.relations[index] = 'mediaAbles';
                option.relations.push('mediaAbles.media');
            }
            const result = yield dbRepository.findOne(id, {
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
                lodash_1.assign(result, { medias });
            }
            return result;
        });
    }
    /**
     * This is Nghia's code
     *
     * Temp move here to backup when error happens on main function
     */
    oldFindAndCount(dbRepository, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Query full text search if has search text
            if (option.search) {
                const searchText = yield normalize_diacritics_1.normalize(option.search.trim());
                if (searchText && option.where) {
                    lodash_1.assign(option.where, {
                        fullTextSearch: typeorm_1.ILike(`%${searchText}%`),
                    });
                }
                else if (searchText) {
                    option.where = { fullTextSearch: typeorm_1.ILike(`%${searchText}%`) };
                }
            }
            let needMedias = false;
            if (option.relations && option.relations.includes('medias')) {
                needMedias = true;
                const index = option.relations.indexOf('medias');
                option.relations[index] = 'mediaAbles';
                option.relations.push('mediaAbles.media');
            }
            const [list, count] = yield dbRepository.findAndCount({
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
                    lodash_1.assign(element, { medias });
                }
            }
            return { list, count };
        });
    }
}
exports.DbHelper = DbHelper;
//# sourceMappingURL=DbHelper.js.map