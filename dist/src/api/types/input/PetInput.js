"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetInput = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
let PetInput = class PetInput {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], PetInput.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, {
        description: 'The age of the pet in years.',
    }),
    tslib_1.__metadata("design:type", Number)
], PetInput.prototype, "age", void 0);
PetInput = tslib_1.__decorate([
    type_graphql_1.InputType()
], PetInput);
exports.PetInput = PetInput;
//# sourceMappingURL=PetInput.js.map