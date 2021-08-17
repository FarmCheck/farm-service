"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocLoader = void 0;
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const cron_decorators_1 = require("cron-decorators");
const iocLoader = (settings) => {
    /**
     * Setup routing-controllers to use typedi container.
     */
    routing_controllers_1.useContainer(typedi_1.Container);
    typeorm_1.useContainer(typedi_1.Container);
    class_validator_1.useContainer(typedi_1.Container);
    cron_decorators_1.useContainer(typedi_1.Container);
};
exports.iocLoader = iocLoader;
//# sourceMappingURL=iocLoader.js.map