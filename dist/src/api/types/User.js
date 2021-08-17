"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const Pet_1 = require("./Pet");
let User = class User {
};
tslib_1.__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({
        description: 'The first name of the user.',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({
        description: 'The last name of the user.',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({
        description: 'The email of the user.',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => [Pet_1.Pet], {
        description: 'A list of pets which belong to the user.',
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "pets", void 0);
User = tslib_1.__decorate([
    type_graphql_1.ObjectType({
        description: 'User object.',
    })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map