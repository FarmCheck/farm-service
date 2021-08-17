"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPaymentRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
let FarmPaymentRepository = class FarmPaymentRepository extends typeorm_1.Repository {
};
FarmPaymentRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(models_1.FarmPayment)
], FarmPaymentRepository);
exports.FarmPaymentRepository = FarmPaymentRepository;
//# sourceMappingURL=FarmPaymentRepository.js.map