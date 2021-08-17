"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmPaymentTable1621777054277 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateFarmPaymentTable1621777054277 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'farm_payment',
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
                        name: 'type',
                        type: 'smallint',
                        isNullable: false,
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'account_no',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'expired_at',
                        type: 'timestamp',
                        isNullable: false,
                        default: 'now()',
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
                    // 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft',
                    {
                        name: 'status',
                        type: 'smallint',
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
            yield queryRunner.dropTable('farm_payment');
        });
    }
}
exports.CreateFarmPaymentTable1621777054277 = CreateFarmPaymentTable1621777054277;
//# sourceMappingURL=1621777054277-CreateFarmPaymentTable.js.map