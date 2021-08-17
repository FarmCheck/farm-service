"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmBody = exports.CreateFarmBody = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_1 = require("./index");
const responses_1 = require("../responses");
class CreateFarmBody extends responses_1.BaseFarm {
}
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => index_1.CreateMediaBaseBody),
    tslib_1.__metadata("design:type", Array)
], CreateFarmBody.prototype, "medias", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], CreateFarmBody.prototype, "productsTotal", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateFarmBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateFarmBody.prototype, "isVerifiedPhoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateFarmBody.prototype, "isVerifiedEmail", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], CreateFarmBody.prototype, "status", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateFarmBody.prototype, "createdAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateFarmBody.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsDateString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateFarmBody.prototype, "deletedAt", void 0);
exports.CreateFarmBody = CreateFarmBody;
class UpdateFarmBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "locationID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "userID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "code", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "name", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "description", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "email", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsPhoneNumber(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUrl(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "website", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "address", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLatitude(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "latitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsLongitude(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmBody.prototype, "longitude", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], UpdateFarmBody.prototype, "status", void 0);
exports.UpdateFarmBody = UpdateFarmBody;
//# sourceMappingURL=FarmRequest.js.map