"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pet = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
let Pet = class Pet {
};
tslib_1.__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], Pet.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({
        description: 'The name of the pet.',
    }),
    tslib_1.__metadata("design:type", String)
], Pet.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int, {
        description: 'The age of the pet in years.',
    }),
    tslib_1.__metadata("design:type", Number)
], Pet.prototype, "age", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => User_1.User, {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", User_1.User)
], Pet.prototype, "owner", void 0);
Pet = tslib_1.__decorate([
    type_graphql_1.ObjectType({
        description: 'Pet object.',
    })
], Pet);
exports.Pet = Pet;
//# sourceMappingURL=Pet.js.map