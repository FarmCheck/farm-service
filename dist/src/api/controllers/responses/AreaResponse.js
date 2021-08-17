"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaDetailResponse = exports.AreaBaseResponse = exports.AreaResponse = exports.BaseArea = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
let BaseArea = class BaseArea {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "locationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "employeeID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "farmID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    class_transformer_1.Expose(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseArea.prototype, "type", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "address", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLatitude(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "latitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLongitude(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "longitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseArea.prototype, "productObjectsTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], BaseArea.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseArea.prototype, "deletedAt", void 0);
BaseArea = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseArea);
exports.BaseArea = BaseArea;
let AreaResponse = class AreaResponse extends BaseArea {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], AreaResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.ProductObjectBaseResponse),
    tslib_1.__metadata("design:type", Array)
], AreaResponse.prototype, "productObjects", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], AreaResponse.prototype, "medias", void 0);
AreaResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], AreaResponse);
exports.AreaResponse = AreaResponse;
let AreaBaseResponse = class AreaBaseResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], AreaBaseResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], AreaBaseResponse.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], AreaBaseResponse.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], AreaBaseResponse.prototype, "status", void 0);
AreaBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], AreaBaseResponse);
exports.AreaBaseResponse = AreaBaseResponse;
let AreaDetailResponse = class AreaDetailResponse extends BaseArea {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], AreaDetailResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.LocationResponse),
    tslib_1.__metadata("design:type", index_1.LocationResponse)
], AreaDetailResponse.prototype, "location", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.FarmResponse),
    tslib_1.__metadata("design:type", index_1.FarmResponse)
], AreaDetailResponse.prototype, "farm", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], AreaDetailResponse.prototype, "medias", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.EmployeeBaseResponse),
    tslib_1.__metadata("design:type", index_1.EmployeeBaseResponse)
], AreaDetailResponse.prototype, "employee", void 0);
AreaDetailResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], AreaDetailResponse);
exports.AreaDetailResponse = AreaDetailResponse;
//# sourceMappingURL=AreaResponse.js.map