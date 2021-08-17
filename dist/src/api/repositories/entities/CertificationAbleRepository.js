"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationAbleRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let CertificationAbleRepository = class CertificationAbleRepository extends typeorm_1.Repository {
};
CertificationAbleRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.CertificationAble)
], CertificationAbleRepository);
exports.CertificationAbleRepository = CertificationAbleRepository;
//# sourceMappingURL=CertificationAbleRepository.js.map