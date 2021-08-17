"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmPayment = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const models_1 = require("../../../api/models");
class CreateFarmPayment {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const farms = yield connection.manager.find(models_1.Farm);
            const payments = yield typeorm_seeding_1.times(farms.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                return yield factory(models_1.FarmPayment)({ farmID: farms[i].id }).make();
            }));
            yield connection.manager.save(payments, {
                chunk: 100,
            });
        });
    }
}
exports.CreateFarmPayment = CreateFarmPayment;
//# sourceMappingURL=09-CreateFarmPayment.js.map