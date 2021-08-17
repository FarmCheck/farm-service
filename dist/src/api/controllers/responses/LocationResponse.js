"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationResponse = exports.BaseLocation = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseLocation = class BaseLocation {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseLocation.prototype, "province", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseLocation.prototype, "provinceCode", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseLocation.prototype, "district", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseLocation.prototype, "districtCode", void 0);
BaseLocation = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseLocation);
exports.BaseLocation = BaseLocation;
let LocationResponse = class LocationResponse extends BaseLocation {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], LocationResponse.prototype, "id", void 0);
LocationResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], LocationResponse);
exports.LocationResponse = LocationResponse;
//# sourceMappingURL=LocationResponse.js.map