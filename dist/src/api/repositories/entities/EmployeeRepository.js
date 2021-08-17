"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let EmployeeRepository = class EmployeeRepository extends typeorm_1.Repository {
};
EmployeeRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Employee)
], EmployeeRepository);
exports.EmployeeRepository = EmployeeRepository;
//# sourceMappingURL=EmployeeRepository.js.map