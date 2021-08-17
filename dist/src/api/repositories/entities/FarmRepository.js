"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let FarmRepository = class FarmRepository extends typeorm_1.Repository {
};
FarmRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Farm)
], FarmRepository);
exports.FarmRepository = FarmRepository;
//# sourceMappingURL=FarmRepository.js.map