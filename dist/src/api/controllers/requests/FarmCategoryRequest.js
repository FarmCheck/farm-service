"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmCategoryBody = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateFarmCategoryBody {
}
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsOptional(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], UpdateFarmCategoryBody.prototype, "categoryID", void 0);
exports.UpdateFarmCategoryBody = UpdateFarmCategoryBody;
//# sourceMappingURL=FarmCategoryRequest.js.map