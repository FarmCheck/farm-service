"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForSubCategoryTable1621863425745 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForSubCategoryTable1621863425745 {
    constructor() {
        this.toCategory = new typeorm_1.TableForeignKey({
            name: 'fk_subcategory_category',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'category',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('sub_category', this.toCategory);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('sub_category', this.toCategory);
        });
    }
}
exports.AddRelationForSubCategoryTable1621863425745 = AddRelationForSubCategoryTable1621863425745;
//# sourceMappingURL=1621863425745-AddRelationForSubCategoryTable.js.map