"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let Location = class Location extends index_1.Base {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn('uuid'),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "province", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'province_code', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "provinceCode", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "district", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'district_code', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Location.prototype, "districtCode", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Farm, (farm) => farm.location),
    type_graphql_1.Field(() => [index_1.Farm]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Location.prototype, "farms", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Area, (area) => area.location),
    type_graphql_1.Field(() => [index_1.Area]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Location.prototype, "areas", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany((type) => index_1.Product, (product) => product.location),
    type_graphql_1.Field(() => [index_1.Product]),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", Array)
], Location.prototype, "products", void 0);
Location = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Location);
exports.Location = Location;
//# sourceMappingURL=Location.js.map