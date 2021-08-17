"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseHelper = void 0;
// import { env } from '../../../env';
class ParseHelper {
    fullQueryParam(query) {
        const baseQuery = this.baseQueryParam(query);
        if (typeof baseQuery.order === 'string') {
            baseQuery.order = JSON.parse(baseQuery.order);
        }
        // handle for pagination
        if (baseQuery.page) {
            baseQuery.page = Number(baseQuery.page);
        }
        if (baseQuery.take) {
            baseQuery.take = Number(baseQuery.take);
        }
        if ((baseQuery.skip && baseQuery.take) || (baseQuery.page && baseQuery.take)) {
            baseQuery.skip = Number(baseQuery.skip) || (baseQuery.page - 1) * baseQuery.take;
        }
        return baseQuery;
    }
    baseQueryParam(query) {
        if (typeof query.where === 'string') {
            query.where = JSON.parse(query.where);
        }
        if (query.select) {
            query.select = JSON.parse(query.select);
        }
        if (query.relations) {
            query.relations = JSON.parse(query.relations);
        }
        return query;
    }
    removeUndefinedProperty(obj) {
        const cloneObj = Object.assign({}, obj);
        Object.keys(cloneObj).forEach(key => cloneObj[key] === undefined && delete cloneObj[key]);
        return cloneObj;
    }
}
exports.ParseHelper = ParseHelper;
//# sourceMappingURL=ParseHelper.js.map