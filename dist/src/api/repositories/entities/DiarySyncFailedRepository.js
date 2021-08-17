"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiarySyncFailedRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../../api/models");
let DiarySyncFailedRepository = class DiarySyncFailedRepository extends typeorm_1.Repository {
};
DiarySyncFailedRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.DiarySyncFailed)
], DiarySyncFailedRepository);
exports.DiarySyncFailedRepository = DiarySyncFailedRepository;
//# sourceMappingURL=DiarySyncFailedRepository.js.map