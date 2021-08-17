"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaTable1621781595854 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateMediaTable1621781595854 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'media',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'type',
                        type: 'smallint',
                        isNullable: false,
                        default: 0,
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
            yield queryRunner.dropTable('media');
        });
    }
}
exports.CreateMediaTable1621781595854 = CreateMediaTable1621781595854;
//# sourceMappingURL=1621781595854-CreateMediaTable.js.map