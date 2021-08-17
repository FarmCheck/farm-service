"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let AreaRepository = class AreaRepository extends typeorm_1.Repository {
};
AreaRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Area)
], AreaRepository);
exports.AreaRepository = AreaRepository;
//# sourceMappingURL=AreaRepository.js.map