"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiarySyncFailedTable1625378377876 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateDiarySyncFailedTable1625378377876 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'diary_sync_failed',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'diary_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'action',
                        type: 'varchar(10)',
                        isNullable: false,
                    },
                    {
                        name: 'last_error',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'retried_time',
                        type: 'int',
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
                        name: 'updated_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: undefined,
                    },
                ],
            });
            return queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return queryRunner.dropTable('diary_sync_failed');
        });
    }
}
exports.CreateDiarySyncFailedTable1625378377876 = CreateDiarySyncFailedTable1625378377876;
//# sourceMappingURL=1625378377876-CreateDiarySyncFailedTable.js.map