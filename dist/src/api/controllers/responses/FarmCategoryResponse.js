"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmCategoryResponse = exports.BaseFarmCategory = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let BaseFarmCategory = class BaseFarmCategory {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseFarmCategory.prototype, "farmID", void 0);
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], BaseFarmCategory.prototype, "categoryID", void 0);
BaseFarmCategory = tslib_1.__decorate([
    class_transformer_1.Exclude()
], BaseFarmCategory);
exports.BaseFarmCategory = BaseFarmCategory;
let FarmCategoryResponse = class FarmCategoryResponse extends BaseFarmCategory {
};
tslib_1.__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    tslib_1.__metadata("design:type", String)
], FarmCategoryResponse.prototype, "id", void 0);
FarmCategoryResponse = tslib_1.__decorate([
    class_transformer_1.Exclude()
], FarmCategoryResponse);
exports.FarmCategoryResponse = FarmCategoryResponse;
//# sourceMappingURL=FarmCategoryResponse.js.map