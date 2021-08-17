"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumStatus = exports.Base = void 0;
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let Base = class Base {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Base.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false, default: 0 }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Base.prototype, "status", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Base.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Base.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at', nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Base.prototype, "deletedAt", void 0);
Base = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType({ isAbstract: true })
], Base);
exports.Base = Base;
var EnumStatus;
(function (EnumStatus) {
    EnumStatus[EnumStatus["ACTIVATE"] = 0] = "ACTIVATE";
    EnumStatus[EnumStatus["DEACTIVATE"] = 1] = "DEACTIVATE";
    EnumStatus[EnumStatus["PAUSE"] = 2] = "PAUSE";
    EnumStatus[EnumStatus["DRAFT"] = 3] = "DRAFT";
})(EnumStatus = exports.EnumStatus || (exports.EnumStatus = {}));
//# sourceMappingURL=Base.js.map