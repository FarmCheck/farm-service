"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationToProductTable1622129447063 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationToProductTable1622129447063 {
    constructor() {
        this.toLocation = new typeorm_1.TableForeignKey({
            name: 'fk_product_location',
            columnNames: ['location_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'location',
        });
        this.toFarm = new typeorm_1.TableForeignKey({
            name: 'fk_product_farm',
            columnNames: ['farm_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'farm',
        });
        this.toSubCategory = new typeorm_1.TableForeignKey({
            name: 'fk_product_subcategory',
            columnNames: ['sub_category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'sub_category',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('product', this.toLocation);
            yield queryRunner.createForeignKey('product', this.toFarm);
            yield queryRunner.createForeignKey('product', this.toSubCategory);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('product', this.toLocation);
            yield queryRunner.dropForeignKey('product', this.toFarm);
            yield queryRunner.dropForeignKey('product', this.toSubCategory);
        });
    }
}
exports.AddRelationToProductTable1622129447063 = AddRelationToProductTable1622129447063;
//# sourceMappingURL=1622129447063-AddRelationToProductTable.js.map