"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let CertificationRepository = class CertificationRepository extends typeorm_1.Repository {
};
CertificationRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Certification)
], CertificationRepository);
exports.CertificationRepository = CertificationRepository;
//# sourceMappingURL=CertificationRepository.js.map