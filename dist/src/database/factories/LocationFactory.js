"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Location, (faker, settings) => {
    const { province, provinceCode, district, districtCode } = settings;
    const location = new models_1.Location();
    location.id = uuid.v1();
    location.province = province;
    location.provinceCode = provinceCode;
    location.district = district;
    location.districtCode = districtCode;
    return location;
});
//# sourceMappingURL=LocationFactory.js.map