"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAble = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let MediaAble = class MediaAble {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], MediaAble.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'target_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], MediaAble.prototype, "targetID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'target_type_id', nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], MediaAble.prototype, "targetTypeID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'media_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], MediaAble.prototype, "mediaID", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Media, (media) => media.mediaAbles),
    typeorm_1.JoinColumn({ name: 'media_id' }),
    type_graphql_1.Field(() => index_1.Media),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Media)
], MediaAble.prototype, "media", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Area || index_1.Product || index_1.ProductObject || index_1.Farm, (ownerImage) => ownerImage.mediaAbles),
    typeorm_1.JoinColumn({ name: 'target_id' }),
    tslib_1.__metadata("design:type", Object)
], MediaAble.prototype, "target", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.TargetType, (targetType) => targetType.mediaAbles),
    typeorm_1.JoinColumn({ name: 'target_type_id' }),
    type_graphql_1.Field(() => index_1.TargetType),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.TargetType)
], MediaAble.prototype, "targetType", void 0);
MediaAble = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], MediaAble);
exports.MediaAble = MediaAble;
//# sourceMappingURL=MediaAble.js.map