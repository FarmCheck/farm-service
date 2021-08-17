"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetTypeRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let TargetTypeRepository = class TargetTypeRepository extends typeorm_1.Repository {
};
TargetTypeRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.TargetType)
], TargetTypeRepository);
exports.TargetTypeRepository = TargetTypeRepository;
//# sourceMappingURL=TargetTypeRepository.js.map