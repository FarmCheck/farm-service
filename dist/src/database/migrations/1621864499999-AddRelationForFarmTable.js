"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForFarmTable1621864499999 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForFarmTable1621864499999 {
    constructor() {
        this.toLocation = new typeorm_1.TableForeignKey({
            name: 'fk_farm_location',
            columnNames: ['location_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'location',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('farm', this.toLocation);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('farm', this.toLocation);
        });
    }
}
exports.AddRelationForFarmTable1621864499999 = AddRelationForFarmTable1621864499999;
//# sourceMappingURL=1621864499999-AddRelationForFarmTable.js.map