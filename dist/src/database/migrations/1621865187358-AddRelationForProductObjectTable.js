"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForProductObjectTable1621865187358 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForProductObjectTable1621865187358 {
    constructor() {
        this.toProduct = new typeorm_1.TableForeignKey({
            name: 'fk_productobject_product',
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'product',
        });
        this.toProcess = new typeorm_1.TableForeignKey({
            name: 'fk_productobject_process',
            columnNames: ['process_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'process',
        });
        this.toArea = new typeorm_1.TableForeignKey({
            name: 'fk_productobject_area',
            columnNames: ['area_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'area',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('product_object', this.toProduct);
            yield queryRunner.createForeignKey('product_object', this.toProcess);
            yield queryRunner.createForeignKey('product_object', this.toArea);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('product_object', this.toProduct);
            yield queryRunner.dropForeignKey('product_object', this.toProcess);
            yield queryRunner.dropForeignKey('product_object', this.toArea);
        });
    }
}
exports.AddRelationForProductObjectTable1621865187358 = AddRelationForProductObjectTable1621865187358;
//# sourceMappingURL=1621865187358-AddRelationForProductObjectTable.js.map