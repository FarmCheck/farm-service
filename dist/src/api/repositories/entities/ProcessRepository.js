"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let ProcessRepository = class ProcessRepository extends typeorm_1.Repository {
};
ProcessRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Process)
], ProcessRepository);
exports.ProcessRepository = ProcessRepository;
//# sourceMappingURL=ProcessRepository.js.map