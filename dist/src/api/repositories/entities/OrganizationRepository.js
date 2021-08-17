"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let OrganizationRepository = class OrganizationRepository extends typeorm_1.Repository {
};
OrganizationRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Organization)
], OrganizationRepository);
exports.OrganizationRepository = OrganizationRepository;
//# sourceMappingURL=OrganizationRepository.js.map