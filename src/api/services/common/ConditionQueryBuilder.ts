import { Repository, SelectQueryBuilder } from 'typeorm';
import { isEmpty } from 'class-validator';
import { normalizeSync } from 'normalize-diacritics';
import { BadRequestError } from 'routing-controllers';

export class ConditionQueryBuilder<T extends any> {
    public static ofRepository<T extends any>(repository: Repository<T>): ConditionQueryBuilder<T> {
        return new ConditionQueryBuilder<T>(repository);
    }
    private _queryBuilder: SelectQueryBuilder<T>;
    private _isSelectFirst = false;
    private _isRelationAdded = false;
    private readonly _target: any;
    private readonly _leftJoins: string[] = [];
    private readonly _leftJoinAndSelects: string[] = [];

    private constructor(private readonly repository: Repository<T>) {
        this._queryBuilder = this.repository.createQueryBuilder('this');
        this._target = this.repository.target;
    }

    /**
     * must call first
     */
    public select(selection?: string[]): this {
        this._isSelectFirst = true;
        if (!selection || !Array.isArray(selection)) {
            return this;
        }
        const dataColumns = [];
        const relationColumn = [];

        for (const select of selection) {
            if (this.hasRelation(select)) {
                relationColumn.push(select);
            } else {
                dataColumns.push(select);
            }
        }

        if (dataColumns.length === 0) {
            /**
             * need at least one column, if not, the response will be empty
             */
            dataColumns.push('id');
        }

        this._queryBuilder = this._queryBuilder.select(
            dataColumns.map(col => `this.${col}`)
        );
        // skip select relations
        // relationColumn.forEach((col) => {
        //     this._queryBuilder = this._queryBuilder.leftJoinAndSelect(
        //         `this.${col}`,
        //         `${col}_from_select`
        //     );
        // });

        return this;
    }

    public relations(relations: string[] = []): this {
        const sortedRelations = relations.sort();
        for (const relation of sortedRelations) {
            const [relate,
                // if relation is `area.farm.location` -> subRelates = ['farm', 'location']
                ...subRelates] = relation.split('.');
            let aliases: string[] = [];
            let relateNames: string[] = [];
            if (subRelates.length) {
                aliases = subRelates.map(subRelate => `this_${subRelate}_nested`.toLowerCase());
                relateNames = subRelates.map(subRelate => `this_${relate}_nested`.toLowerCase() + `.${subRelate}`);
            } else {
                aliases = [`this_${relate}_nested`.toLowerCase()];
                relateNames = [`this.${relate}`];
            }
            try {
                aliases.forEach((alias, index) => {
                    const relateName = relateNames[index];
                    if (!this._leftJoinAndSelects.includes(alias)) {
                        this._queryBuilder = this._queryBuilder
                            .leftJoinAndSelect(`${relateName}`, alias.toLowerCase());
                        this._leftJoinAndSelects.push(alias);
                    }
                });
            } catch (e) {
                throw new BadRequestError(`Relations error: ${e.message || e}`);
            }
        }
        this._isRelationAdded = true;
        return this;
    }

    public condition(conditionMap?: Record<string, ICondition>, parentField: string = 'this'): this {
        this._checkSelect();
        this._checkRelation();
        if (!conditionMap || isEmpty(conditionMap)) {
            return this;
        }
        for (const field of Object.keys(conditionMap)) {
            const condition = conditionMap[field];
            this.parseCondition(`${parentField}.${field}`, condition);
        }
        return this;
    }

    public take(take: number): this {
        this._checkSelect();
        this._queryBuilder = this._queryBuilder.take(take);
        return this;
    }

    public skip(skip: number): this {
        this._checkSelect();
        this._queryBuilder = this._queryBuilder.skip(skip);
        return this;
    }

    public offset(areYouSure: boolean, offset: number = 0): this {
        if (!areYouSure) {
            throw new Error('You don\'t sure to use this');
        }

        this._checkSelect();
        this._queryBuilder = this._queryBuilder.offset(offset);
        return this;
    }

    public order(orders?: Record<string, number>): this {
        this._checkSelect();
        if (!orders) {
            return this;
        }
        for (const orderField of Object.keys(orders)) {
            const field = `this.${orderField}`;
            const orderDir = orders[orderField] > 0 ? 'ASC' : 'DESC';

            this._queryBuilder = this._queryBuilder
                .addOrderBy(field, orderDir, 'NULLS LAST');
        }
        return this;
    }

    /**
     * using for entities that have `fullTextSearch` column
     */
    public search(search?: string): this {
        this._checkSelect();
        if (!!search) {
            const searchNormalize = normalizeSync(search.trim());
            this._queryBuilder = this._queryBuilder
                .andWhere(`this.fullTextSearch ILIKE :search`, { search: `%${searchNormalize}%` });
        }
        return this;
    }

    public build(): SelectQueryBuilder<T> {
        return this._queryBuilder;
    }
    // #endregion

    private hasRelation(field: string): boolean {
        const [relation] = field.split('.');
        return this._queryBuilder.hasRelation(this._target, relation);
    }

    private parseCondition(field: string, conditions: ICondition): this {
        if (typeof conditions === 'number' || typeof conditions === 'string') {
            const param = `${field}`
                .toLowerCase()
                .replace('.', '__');

            this._queryBuilder = this._queryBuilder
                .andWhere(`${field} = :${param}`, { [param]: conditions });
            return this;
        }
        const keys = Object.keys(conditions) as IConditionType[];
        for (const type of keys) {
            const value = conditions[type];
            switch (type) {
                case IConditionType.eq:
                    this._queryBuilder = this._queryBuilder
                        .andWhere(`${field} = :eq`, { eq: value });
                    continue;
                case IConditionType.ge:
                    this._queryBuilder = this._queryBuilder
                        .andWhere(`${field} >= :ge`, { ge: value });
                    continue;
                case IConditionType.gt:
                    this._queryBuilder = this._queryBuilder
                        .andWhere(`${field} > :gt`, { gt: value });
                    continue;
                case IConditionType.le:
                    this._queryBuilder = this._queryBuilder
                        .andWhere(`${field} <= :le`, { le: value });
                    continue;
                case IConditionType.lt:
                    this._queryBuilder = this._queryBuilder
                        .andWhere(`${field} < :lt`, { lt: value });
                    continue;
                case IConditionType.not:
                    this._queryBuilder = this._queryBuilder
                        .andWhere(`${field} != :not`, { not: value });
                    continue;
                default: {
                    // TODO: handle maximum deep level
                    const alias = `${field}_nested`
                        .replace('.', '_')
                        .toLowerCase();
                    if (!this._leftJoins.includes(alias) && !this._leftJoinAndSelects.includes(alias)) {
                        this._queryBuilder = this._queryBuilder.leftJoin(field, alias);
                        this._leftJoins.push(alias);
                    }
                    return this.condition(conditions as Record<string, ICondition>, alias);
                }
            }
        }
        return this;
    }

    private _checkSelect(): void {
        if (!this._isSelectFirst) {
            throw new Error('function `select` must be call first');
        }
    }

    private _checkRelation(): void {
        if (!this._isRelationAdded) {
            throw new Error('function `relation` must be called before `condition`');
        }
    }
}

export enum IConditionType {
    eq = 'eq', // equal
    lt = 'lt', // less than
    gt = 'gt', // greater than
    ge = 'ge', // greater or equal
    le = 'le', // less or equal
    not = 'not', // not equal
}

export type ICondition = {
    [key in IConditionType]?: string | number;
} | {
    [key: string]: any;
};
