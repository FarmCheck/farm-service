"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapApp = void 0;
const tslib_1 = require("tslib");
const microframework_w3tec_1 = require("microframework-w3tec");
const eventDispatchLoader_1 = require("../../../src/loaders/eventDispatchLoader");
const expressLoader_1 = require("../../../src/loaders/expressLoader");
const homeLoader_1 = require("../../../src/loaders/homeLoader");
const iocLoader_1 = require("../../../src/loaders/iocLoader");
const winstonLoader_1 = require("../../../src/loaders/winstonLoader");
const typeormLoader_1 = require("../utils/typeormLoader");
const bootstrapApp = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const framework = yield microframework_w3tec_1.bootstrapMicroframework({
        loaders: [
            winstonLoader_1.winstonLoader,
            iocLoader_1.iocLoader,
            eventDispatchLoader_1.eventDispatchLoader,
            typeormLoader_1.typeormLoader,
            expressLoader_1.expressLoader,
            homeLoader_1.homeLoader,
        ],
    });
    return {
        app: framework.settings.getData('express_app'),
        server: framework.settings.getData('express_server'),
        connection: framework.settings.getData('connection'),
    };
});
exports.bootstrapApp = bootstrapApp;
//# sourceMappingURL=bootstrap.js.map