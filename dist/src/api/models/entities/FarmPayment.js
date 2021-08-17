"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPayment = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("../index");
const type_graphql_1 = require("type-graphql");
const type_graphql_dataloader_1 = require("type-graphql-dataloader");
let FarmPayment = class FarmPayment extends index_1.Base {
};
tslib_1.__decorate([
    typeorm_1.Column({ name: 'farm_id', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], FarmPayment.prototype, "farmID", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field({ description: '0: banking card, 1: credit card, 2: debit card' }),
    tslib_1.__metadata("design:type", Number)
], FarmPayment.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], FarmPayment.prototype, "provider", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'account_no', nullable: false }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], FarmPayment.prototype, "accountNo", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'expired_at', default: 'now()' }),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], FarmPayment.prototype, "expiredAt", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne((type) => index_1.Farm, (farm) => farm.farmPayments),
    typeorm_1.JoinColumn({ name: 'farm_id' }),
    type_graphql_1.Field(() => index_1.Farm),
    type_graphql_dataloader_1.TypeormLoader(),
    tslib_1.__metadata("design:type", index_1.Farm)
], FarmPayment.prototype, "farm", void 0);
FarmPayment = tslib_1.__decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], FarmPayment);
exports.FarmPayment = FarmPayment;
//# sourceMappingURL=FarmPayment.js.map