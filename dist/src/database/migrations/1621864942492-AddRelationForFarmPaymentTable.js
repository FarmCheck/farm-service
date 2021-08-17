"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForFarmPaymentTable1621864942492 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForFarmPaymentTable1621864942492 {
    constructor() {
        this.toFarm = new typeorm_1.TableForeignKey({
            name: 'fk_farmpayment_farm',
            columnNames: ['farm_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'farm',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('farm_payment', this.toFarm);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('farm_payment', this.toFarm);
        });
    }
}
exports.AddRelationForFarmPaymentTable1621864942492 = AddRelationForFarmPaymentTable1621864942492;
//# sourceMappingURL=1621864942492-AddRelationForFarmPaymentTable.js.map