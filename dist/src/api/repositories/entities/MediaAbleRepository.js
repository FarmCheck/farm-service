"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAbleRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let MediaAbleRepository = class MediaAbleRepository extends typeorm_1.Repository {
};
MediaAbleRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.MediaAble)
], MediaAbleRepository);
exports.MediaAbleRepository = MediaAbleRepository;
//# sourceMappingURL=MediaAbleRepository.js.map