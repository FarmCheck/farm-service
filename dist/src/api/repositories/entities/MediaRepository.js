"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let MediaRepository = class MediaRepository extends typeorm_1.Repository {
};
MediaRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Media)
], MediaRepository);
exports.MediaRepository = MediaRepository;
//# sourceMappingURL=MediaRepository.js.map