"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelper = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const logger_1 = require("../lib/logger");
class AuthHelper {
    static getPayloadFromJWT(jwt) {
        // @ts-ignore
        const [_header, payloadBase64, _etc] = jwt.split('.', 3);
        const payloadString = Buffer.from(payloadBase64, 'base64').toString();
        return JSON.parse(payloadString);
    }
    static authQueryByWhereParam(source, user, compareField) {
        const log = new logger_1.Logger(__filename);
        try {
            let valueCheckOfEntity = source;
            const fields = compareField.inEntity.split('.');
            for (const field of fields) {
                valueCheckOfEntity = valueCheckOfEntity[field];
            }
            if (!valueCheckOfEntity || !user[compareField.inUser] || valueCheckOfEntity !== user[compareField.inUser]) {
                throw new Error('Forbidden');
            }
        }
        catch (error) {
            log.error(error.stack);
            throw new routing_controllers_1.HttpError(403, 'Forbidden');
        }
    }
    static authQuery(valueCheck, compareField, user) {
        if (!valueCheck || !user[compareField] || valueCheck !== user[compareField]) {
            throw new routing_controllers_1.HttpError(403, 'Forbidden');
        }
    }
    static authQueryNeedFinding(repository, id, compareField, user, relations = []) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new routing_controllers_1.HttpError(403, 'Forbidden');
            }
            const entity = yield repository.findOne(id, { relations });
            if (!user[compareField.inUser] || !entity) {
                throw new routing_controllers_1.HttpError(403, 'Forbidden');
            }
            let valueCheckOfEntity = entity;
            const fields = compareField.inEntity.split('.');
            for (const field of fields) {
                valueCheckOfEntity = valueCheckOfEntity[field];
            }
            if (valueCheckOfEntity !== user[compareField.inUser]) {
                throw new routing_controllers_1.HttpError(403, 'Forbidden');
            }
        });
    }
    static authQueryByWhereParamNeedFinding(repository, where, compareField, user, relations = []) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const log = new logger_1.Logger(__filename);
            try {
                let idValue = where;
                let fields = compareField.idField.split('.');
                for (const field of fields) {
                    idValue = idValue[field];
                }
                if (!idValue) {
                    throw new Error('Forbidden');
                }
                const entity = yield repository.findOne(idValue, { relations });
                if (!user[compareField.inUser] || !entity) {
                    throw new Error('Forbidden');
                }
                let valueCheckOfEntity = entity;
                fields = compareField.inEntity.split('.');
                for (const field of fields) {
                    valueCheckOfEntity = valueCheckOfEntity[field];
                }
                if (valueCheckOfEntity !== user[compareField.inUser]) {
                    throw new Error('Forbidden');
                }
            }
            catch (error) {
                log.error(error.stack);
                throw new routing_controllers_1.HttpError(403, 'Forbidden');
            }
        });
    }
}
exports.AuthHelper = AuthHelper;
//# sourceMappingURL=AuthHelper.js.map