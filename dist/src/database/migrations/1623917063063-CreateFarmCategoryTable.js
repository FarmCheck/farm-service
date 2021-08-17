"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmCategoryTable1623917063063 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateFarmCategoryTable1623917063063 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'farm_category',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'farm_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('farm_category');
        });
    }
}
exports.CreateFarmCategoryTable1623917063063 = CreateFarmCategoryTable1623917063063;
//# sourceMappingURL=1623917063063-CreateFarmCategoryTable.js.map