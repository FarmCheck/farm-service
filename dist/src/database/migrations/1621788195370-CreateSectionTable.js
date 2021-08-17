"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSectionTable1621788195370 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateSectionTable1621788195370 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'section',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'product_object_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'process_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'area_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'smallint',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'type',
                        type: 'smallint',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                    {
                        name: 'diaries_total',
                        type: 'int',
                        isNullable: false,
                        default: 0,
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('section');
        });
    }
}
exports.CreateSectionTable1621788195370 = CreateSectionTable1621788195370;
//# sourceMappingURL=1621788195370-CreateSectionTable.js.map