"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnFarmIdToProcessTable1622130152632 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddColumnFarmIdToProcessTable1622130152632 {
    constructor() {
        this.toFarm = new typeorm_1.TableForeignKey({
            name: 'fk_process_farm',
            columnNames: ['farm_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'farm',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumn('process', new typeorm_1.TableColumn({
                name: 'farm_id',
                type: 'uuid',
                isNullable: false,
            }));
            yield queryRunner.createForeignKey('process', this.toFarm);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('process', 'farm_id');
            yield queryRunner.dropForeignKey('process', this.toFarm);
        });
    }
}
exports.AddColumnFarmIdToProcessTable1622130152632 = AddColumnFarmIdToProcessTable1622130152632;
//# sourceMappingURL=1622130152632-AddColumnFarmIdToProcessTable.js.map