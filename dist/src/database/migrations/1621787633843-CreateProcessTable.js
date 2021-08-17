"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProcessTable1621787633843 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProcessTable1621787633843 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'process',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'product_objects_total',
                        type: 'int',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'quantity',
                        type: 'int',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'is_have_step',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
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
            CREATE TRIGGER process_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON process FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX process_full_text_search_idx ON process USING GIN(full_text_search_col gin_trgm_ops);
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('process');
        });
    }
}
exports.CreateProcessTable1621787633843 = CreateProcessTable1621787633843;
//# sourceMappingURL=1621787633843-CreateProcessTable.js.map