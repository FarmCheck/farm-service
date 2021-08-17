"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let DiaryRepository = class DiaryRepository extends typeorm_1.Repository {
};
DiaryRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Diary)
], DiaryRepository);
exports.DiaryRepository = DiaryRepository;
//# sourceMappingURL=DiaryRepository.js.map