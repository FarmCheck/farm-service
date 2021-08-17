"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParserMiddleware = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
let BodyParserMiddleware = class BodyParserMiddleware {
    constructor() {
        this.jsonBodyParser = body_parser_1.default.json();
    }
    use(req, res, next) {
        this.jsonBodyParser(req, res, next);
    }
};
BodyParserMiddleware = tslib_1.__decorate([
    routing_controllers_1.Middleware({ type: 'before', priority: 10 }),
    tslib_1.__metadata("design:paramtypes", [])
], BodyParserMiddleware);
exports.BodyParserMiddleware = BodyParserMiddleware;
//# sourceMappingURL=BodyParserMiddleware.js.map