"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
let Media = class Media {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Media.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: true }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Media.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Media.prototype, "url", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'url_thumbnail', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Media.prototype, "urlThumbnail", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'created_at', nullable: false, default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Media.prototype, "createdAt", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.MediaAble, (mediaAble) => mediaAble.media),
    tslib_1.__metadata("design:type", Array)
], Media.prototype, "mediaAbles", void 0);
Media = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Media);
exports.Media = Media;
//# sourceMappingURL=Media.js.map