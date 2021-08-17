"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetType = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
let TargetType = class TargetType {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], TargetType.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], TargetType.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => index_1.CertificationAble, certificationAble => certificationAble.targetType),
    tslib_1.__metadata("design:type", Array)
], TargetType.prototype, "certificationAbles", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => index_1.MediaAble, mediaAble => mediaAble.targetType),
    tslib_1.__metadata("design:type", Array)
], TargetType.prototype, "mediaAbles", void 0);
TargetType = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], TargetType);
exports.TargetType = TargetType;
//# sourceMappingURL=TargetType.js.map