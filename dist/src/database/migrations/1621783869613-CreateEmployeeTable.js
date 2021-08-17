"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmployeeTable1621783869613 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateEmployeeTable1621783869613 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'employee',
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
                        isNullable: true,
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
                        name: 'role',
                        type: 'smallint',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'phoneNumber',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'is_verified_phone_number',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: false,
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
                    {
                        name: 'full_text_search_col',
                        type: 'varchar',
                        isNullable: false,
                    },
                ],
            });
            yield queryRunner.createTable(table);
            yield queryRunner.query(`
            CREATE TRIGGER employee_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON employee FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX employee_full_text_search_idx ON employee USING GIN(full_text_search_col gin_trgm_ops);
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('employee');
        });
    }
}
exports.CreateEmployeeTable1621783869613 = CreateEmployeeTable1621783869613;
//# sourceMappingURL=1621783869613-CreateEmployeeTable.js.map