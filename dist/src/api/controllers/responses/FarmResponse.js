"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmDashBoardResponse = exports.FarmDetailResponse = exports.FarmBaseResponse = exports.FarmResponse = exports.BaseFarm = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const index_1 = require("./index");
let BaseFarm = class BaseFarm {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "locationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "userID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], BaseFarm.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], BaseFarm.prototype, "isVerifiedEmail", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "email", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "logo", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "banner", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsPhoneNumber(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "website", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "address", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLatitude(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "latitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLongitude(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "longitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseFarm.prototype, "productsTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], BaseFarm.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], BaseFarm.prototype, "deletedAt", void 0);
BaseFarm = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseFarm);
exports.BaseFarm = BaseFarm;
let FarmResponse = class FarmResponse extends BaseFarm {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], FarmResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.LocationResponse),
    tslib_1.__metadata("design:type", index_1.LocationResponse)
], FarmResponse.prototype, "location", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], FarmResponse.prototype, "medias", void 0);
FarmResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], FarmResponse);
exports.FarmResponse = FarmResponse;
let FarmBaseResponse = class FarmBaseResponse extends FarmResponse {
};
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], FarmBaseResponse.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], FarmBaseResponse.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], FarmBaseResponse.prototype, "medias", void 0);
FarmBaseResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], FarmBaseResponse);
exports.FarmBaseResponse = FarmBaseResponse;
let FarmDetailResponse = class FarmDetailResponse extends BaseFarm {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], FarmDetailResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsObject(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => index_1.LocationResponse),
    tslib_1.__metadata("design:type", index_1.LocationResponse)
], FarmDetailResponse.prototype, "location", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.MediaBaseResponse),
    tslib_1.__metadata("design:type", Array)
], FarmDetailResponse.prototype, "medias", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.CertificationAbleResponse),
    tslib_1.__metadata("design:type", Array)
], FarmDetailResponse.prototype, "certificationAbles", void 0);
FarmDetailResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], FarmDetailResponse);
exports.FarmDetailResponse = FarmDetailResponse;
let FarmDashBoardResponse = class FarmDashBoardResponse {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], FarmDashBoardResponse.prototype, "id", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], FarmDashBoardResponse.prototype, "areasTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], FarmDashBoardResponse.prototype, "productObjectsTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], FarmDashBoardResponse.prototype, "sectionsTotal", void 0);
FarmDashBoardResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], FarmDashBoardResponse);
exports.FarmDashBoardResponse = FarmDashBoardResponse;
//# sourceMappingURL=FarmResponse.js.map