"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassTransformerInterceptor = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
/**
 * **Global Interceptor** will run before **Function Interceptor**
 *
 * So I assume that content will be like `{ code: 200, data: any }`
 *
 * We will format content.data
 */
// TODO: bugs if object is undefined
function ClassTransformerInterceptor(cls, opts = {}) {
    return (action, content) => {
        const mergeOptions = Object.assign({ strategy: 'excludeAll' }, opts);
        const { data } = content, rest = tslib_1.__rest(content, ["data"]);
        const newData = class_transformer_1.plainToClass(cls, data, mergeOptions);
        return Object.assign(Object.assign({}, rest), { data: newData });
    };
}
exports.ClassTransformerInterceptor = ClassTransformerInterceptor;
//# sourceMappingURL=ClassTransformerInterceptor.js.map