"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IConditionType = exports.ConditionQueryBuilder = void 0;
const class_validator_1 = require("class-validator");
const normalize_diacritics_1 = require("normalize-diacritics");
const routing_controllers_1 = require("routing-controllers");
class ConditionQueryBuilder {
    constructor(repository) {
        this.repository = repository;
        this._isSelectFirst = false;
        this._isRelationAdded = false;
        this._leftJoins = [];
        this._leftJoinAndSelects = [];
        this._queryBuilder = this.repository.createQueryBuilder('this');
        this._target = this.repository.target;
    }
    static ofRepository(repository) {
        return new ConditionQueryBuilder(repository);
    }
    /**
     * must call first
     */
    select(selection) {
        this._isSelectFirst = true;
        if (!selection || !Array.isArray(selection)) {
            return this;
        }
        const dataColumns = [];
        const relationColumn = [];
        for (const select of selection) {
            if (this.hasRelation(select)) {
                relationColumn.push(select);
            }
            else {
                dataColumns.push(select);
            }
        }
        if (dataColumns.length === 0) {
            /**
             * need at least one column, if not, the response will be empty
             */
            dataColumns.push('id');
        }
        this._queryBuilder = this._queryBuilder.select(dataColumns.map(col => `this.${col}`));
        // skip select relations
        // relationColumn.forEach((col) => {
        //     this._queryBuilder = this._queryBuilder.leftJoinAndSelect(
        //         `this.${col}`,
        //         `${col}_from_select`
        //     );
        // });
        return this;
    }
    relations(relations = []) {
        const sortedRelations = relations.sort();
        for (const relation of sortedRelations) {
            const [relate, 
            // if relation is `area.farm.location` -> subRelates = ['farm', 'location']
            ...subRelates] = relation.split('.');
            let aliases = [];
            let relateNames = [];
            if (subRelates.length) {
                aliases = subRelates.map(subRelate => `this_${subRelate}_nested`.toLowerCase());
                relateNames = subRelates.map(subRelate => `this_${relate}_nested`.toLowerCase() + `.${subRelate}`);
            }
            else {
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
            }
            catch (e) {
                throw new routing_controllers_1.BadRequestError(`Relations error: ${e.message || e}`);
            }
        }
        this._isRelationAdded = true;
        return this;
    }
    condition(conditionMap, parentField = 'this') {
        this._checkSelect();
        this._checkRelation();
        if (!conditionMap || class_validator_1.isEmpty(conditionMap)) {
            return this;
        }
        for (const field of Object.keys(conditionMap)) {
            const condition = conditionMap[field];
            this.parseCondition(`${parentField}.${field}`, condition);
        }
        return this;
    }
    take(take) {
        this._checkSelect();
        this._queryBuilder = this._queryBuilder.take(take);
        return this;
    }
    skip(skip) {
        this._checkSelect();
        this._queryBuilder = this._queryBuilder.skip(skip);
        return this;
    }
    offset(areYouSure, offset = 0) {
        if (!areYouSure) {
            throw new Error('You don\'t sure to use this');
        }
        this._checkSelect();
        this._queryBuilder = this._queryBuilder.offset(offset);
        return this;
    }
    order(orders) {
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
    search(search) {
        this._checkSelect();
        if (!!search) {
            const searchNormalize = normalize_diacritics_1.normalizeSync(search.trim());
            this._queryBuilder = this._queryBuilder
                .andWhere(`this.fullTextSearch ILIKE :search`, { search: `%${searchNormalize}%` });
        }
        return this;
    }
    build() {
        return this._queryBuilder;
    }
    // #endregion
    hasRelation(field) {
        const [relation] = field.split('.');
        return this._queryBuilder.hasRelation(this._target, relation);
    }
    parseCondition(field, conditions) {
        if (typeof conditions === 'number' || typeof conditions === 'string') {
            const param = `${field}`
                .toLowerCase()
                .replace('.', '__');
            this._queryBuilder = this._queryBuilder
                .andWhere(`${field} = :${param}`, { [param]: conditions });
            return this;
        }
        const keys = Object.keys(conditions);
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
                    return this.condition(conditions, alias);
                }
            }
        }
        return this;
    }
    _checkSelect() {
        if (!this._isSelectFirst) {
            throw new Error('function `select` must be call first');
        }
    }
    _checkRelation() {
        if (!this._isRelationAdded) {
            throw new Error('function `relation` must be called before `condition`');
        }
    }
}
exports.ConditionQueryBuilder = ConditionQueryBuilder;
var IConditionType;
(function (IConditionType) {
    IConditionType["eq"] = "eq";
    IConditionType["lt"] = "lt";
    IConditionType["gt"] = "gt";
    IConditionType["ge"] = "ge";
    IConditionType["le"] = "le";
    IConditionType["not"] = "not";
})(IConditionType = exports.IConditionType || (exports.IConditionType = {}));
//# sourceMappingURL=ConditionQueryBuilder.js.map