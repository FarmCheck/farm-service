"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasErrorCode = exports.getErrorMessage = exports.getErrorCode = exports.handlingErrors = exports.setDefaultHandler = exports.defaultHandler = exports.UserError = exports.IsUserError = exports.Processed = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const uuid = tslib_1.__importStar(require("uuid"));
const env_1 = require("../../env");
const logger_1 = require("../logger");
// This feature is a copy from https://github.com/kadirahq/graphql-errors
const logger = new logger_1.Logger('app:errors');
// Mark field/type/schema
exports.Processed = Symbol();
// Used to identify UserErrors
exports.IsUserError = Symbol();
// UserErrors will be sent to the user
class UserError extends Error {
    constructor(...args) {
        super(args[0]);
        this.name = 'Error';
        this.message = args[0];
        this[exports.IsUserError] = true;
        Error.captureStackTrace(this);
    }
}
exports.UserError = UserError;
// Modifies errors before sending to the user
let defaultHandler = (err) => {
    if (err[exports.IsUserError]) {
        return err;
    }
    const errId = uuid.v4();
    err.message = `${err.message}: ${errId}`;
    if (!env_1.env.isTest) {
        console.error(err && err.stack || err);
    }
    if (env_1.env.isProduction) {
        logger.error(err);
    }
    // err.message = `500: Internal Error: ${errId}`;
    return err;
};
exports.defaultHandler = defaultHandler;
const maskField = (field, fn) => {
    const resolveFn = field.resolve;
    if (field[exports.Processed] || !resolveFn) {
        return;
    }
    field[exports.Processed] = true;
    field.resolve = (...args) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const out = resolveFn.call(undefined, ...args);
            return yield Promise.resolve(out);
        }
        catch (e) {
            throw fn(e);
        }
    });
    // save the original resolve function
    field.resolve._resolveFn = resolveFn;
};
const maskType = (type, fn) => {
    if (type[exports.Processed] || !type.getFields) {
        return;
    }
    const fields = type.getFields();
    for (const fieldName in fields) {
        if (!Object.hasOwnProperty.call(fields, fieldName)) {
            continue;
        }
        maskField(fields[fieldName], fn);
    }
};
const maskSchema = (schema, fn) => {
    const types = schema.getTypeMap();
    for (const typeName in types) {
        if (!Object.hasOwnProperty.call(types, typeName)) {
            continue;
        }
        maskType(types[typeName], fn);
    }
};
// Changes the default error handler function
const setDefaultHandler = (handlerFn) => {
    exports.defaultHandler = handlerFn;
};
exports.setDefaultHandler = setDefaultHandler;
// Masks graphql schemas, types or individual fields
const handlingErrors = (thing, fn = exports.defaultHandler) => {
    if (thing instanceof graphql_1.GraphQLSchema) {
        maskSchema(thing, fn);
    }
    else if (thing instanceof graphql_1.GraphQLObjectType) {
        maskType(thing, fn);
    }
    else {
        maskField(thing, fn);
    }
};
exports.handlingErrors = handlingErrors;
const getErrorCode = (message) => {
    if (exports.hasErrorCode(message)) {
        return message.substring(0, 3);
    }
    return '500'; // unkown error code
};
exports.getErrorCode = getErrorCode;
const getErrorMessage = (message) => {
    if (exports.hasErrorCode(message)) {
        return message.substring(5);
    }
    return message;
};
exports.getErrorMessage = getErrorMessage;
const hasErrorCode = (error) => {
    let message = error;
    if (error.message) {
        message = error.message;
    }
    const reg = new RegExp('^[0-9]{3}: ');
    return reg.test(message);
};
exports.hasErrorCode = hasErrorCode;
//# sourceMappingURL=graphql-error-handling.js.map