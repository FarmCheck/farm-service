"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepPropertyRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let StepPropertyRepository = class StepPropertyRepository extends typeorm_1.Repository {
};
StepPropertyRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.StepProperty)
], StepPropertyRepository);
exports.StepPropertyRepository = StepPropertyRepository;
//# sourceMappingURL=StepPropertyRepository.js.map