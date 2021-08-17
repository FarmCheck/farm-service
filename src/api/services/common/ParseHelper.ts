import { BaseQuery, FullQuery } from '../../controllers/requests';
// import { env } from '../../../env';

export class ParseHelper {
    public fullQueryParam(query: FullQuery): any {
        const baseQuery = this.baseQueryParam(query);

        if (typeof baseQuery.order === 'string') {
            baseQuery.order = JSON.parse(baseQuery.order);
        }

        // default skip follow (page-1) * take
        if (baseQuery.page && baseQuery.take) {
            baseQuery.skip = (baseQuery.page - 1) * baseQuery.take;
        }

        return baseQuery;
    }

    public baseQueryParam(query: BaseQuery): any {
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

    public removeUndefinedProperty(obj: object): any {
        const cloneObj = {...obj};
        Object.keys(cloneObj).forEach(key => cloneObj[key] === undefined && delete cloneObj[key]);

        return cloneObj;
    }
}
