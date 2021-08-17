"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let StepRepository = class StepRepository extends typeorm_1.Repository {
};
StepRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Step)
], StepRepository);
exports.StepRepository = StepRepository;
//# sourceMappingURL=StepRepository.js.map