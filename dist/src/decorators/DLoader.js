"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DLoader = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const graphql_1 = require("../lib/graphql");
function DLoader(obj, options = {}) {
    return (object, propertyKey, index) => {
        const dataLoader = graphql_1.createDataLoader(obj, options);
        const propertyName = propertyKey ? propertyKey.toString() : '';
        typedi_1.Container.registerHandler({ object, propertyName, index, value: () => dataLoader });
    };
}
exports.DLoader = DLoader;
tslib_1.__exportStar(require("../lib/graphql"), exports);
//# sourceMappingURL=DLoader.js.map