"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryTable1621784333242 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCategoryTable1621784333242 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'category',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'note',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'url',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'url_thumbnail',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('category');
        });
    }
}
exports.CreateCategoryTable1621784333242 = CreateCategoryTable1621784333242;
//# sourceMappingURL=1621784333242-CreateCategoryTable.js.map