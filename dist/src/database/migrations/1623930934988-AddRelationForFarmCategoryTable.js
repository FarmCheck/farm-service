"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForFarmCategoryTable1623930934988 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForFarmCategoryTable1623930934988 {
    constructor() {
        this.toCategory = new typeorm_1.TableForeignKey({
            name: 'fk_farmcategory_category',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
        });
        this.toFarm = new typeorm_1.TableForeignKey({
            name: 'fk_farmcategory_farm',
            columnNames: ['farm_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'farm',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                queryRunner.createForeignKey('farm_category', this.toCategory),
                queryRunner.createForeignKey('farm_category', this.toFarm),
            ]);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                queryRunner.dropForeignKey('farm_category', this.toCategory),
                queryRunner.dropForeignKey('farm_category', this.toFarm),
            ]);
        });
    }
}
exports.AddRelationForFarmCategoryTable1623930934988 = AddRelationForFarmCategoryTable1623930934988;
//# sourceMappingURL=1623930934988-AddRelationForFarmCategoryTable.js.map