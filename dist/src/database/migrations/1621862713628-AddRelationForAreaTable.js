"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForAreaTable1621862713628 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForAreaTable1621862713628 {
    constructor() {
        this.toLocation = new typeorm_1.TableForeignKey({
            name: 'fk_area_location',
            columnNames: ['location_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'location',
        });
        this.toEmployee = new typeorm_1.TableForeignKey({
            name: 'fk_area_employee',
            columnNames: ['employee_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employee',
        });
        this.toFarm = new typeorm_1.TableForeignKey({
            name: 'fk_area_farm',
            columnNames: ['farm_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'farm',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('area', this.toLocation);
            yield queryRunner.createForeignKey('area', this.toEmployee);
            yield queryRunner.createForeignKey('area', this.toFarm);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('area', this.toLocation);
            yield queryRunner.dropForeignKey('area', this.toEmployee);
            yield queryRunner.dropForeignKey('area', this.toFarm);
        });
    }
}
exports.AddRelationForAreaTable1621862713628 = AddRelationForAreaTable1621862713628;
//# sourceMappingURL=1621862713628-AddRelationForAreaTable.js.map