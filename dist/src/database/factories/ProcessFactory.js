"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Process, (faker, settings) => {
    const { farmID, code, name } = settings;
    const process = new models_1.Process();
    process.id = uuid.v1();
    process.farmID = farmID;
    process.code = code;
    process.name = name;
    return process;
});
//# sourceMappingURL=ProcessFactory.js.map