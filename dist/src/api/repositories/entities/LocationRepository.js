"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let LocationRepository = class LocationRepository extends typeorm_1.Repository {
};
LocationRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.Location)
], LocationRepository);
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=LocationRepository.js.map