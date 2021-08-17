"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForSectionTable1621865603421 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForSectionTable1621865603421 {
    constructor() {
        this.toProductObject = new typeorm_1.TableForeignKey({
            name: 'fk_section_productobject',
            columnNames: ['product_object_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'product_object',
        });
        this.toProcess = new typeorm_1.TableForeignKey({
            name: 'fk_section_process',
            columnNames: ['process_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'process',
        });
        this.toArea = new typeorm_1.TableForeignKey({
            name: 'fk_section_area',
            columnNames: ['area_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'area',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('section', this.toProductObject);
            yield queryRunner.createForeignKey('section', this.toProcess);
            yield queryRunner.createForeignKey('section', this.toArea);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('section', this.toProductObject);
            yield queryRunner.dropForeignKey('section', this.toProcess);
            yield queryRunner.dropForeignKey('section', this.toArea);
        });
    }
}
exports.AddRelationForSectionTable1621865603421 = AddRelationForSectionTable1621865603421;
//# sourceMappingURL=1621865603421-AddRelationForSectionTable.js.map