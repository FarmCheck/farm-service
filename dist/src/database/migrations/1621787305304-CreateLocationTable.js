"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLocationTable1621787305304 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateLocationTable1621787305304 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'location',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'province',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'province_code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'district',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'district_code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    // 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft',
                    {
                        name: 'status',
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
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('location');
        });
    }
}
exports.CreateLocationTable1621787305304 = CreateLocationTable1621787305304;
//# sourceMappingURL=1621787305304-CreateLocationTable.js.map