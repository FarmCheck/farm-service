"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAreaTable1621783869513 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateAreaTable1621783869513 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'area',
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
                        name: 'location_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'employee_id',
                        type: 'uuid',
                        isNullable: true,
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
                    // 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others'
                    {
                        name: 'type',
                        type: 'smallint',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'address',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'latitude',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'longitude',
                        type: 'varchar',
                        isNullable: true,
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
            CREATE TRIGGER area_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON area FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX area_full_text_search_idx ON area USING GIN(full_text_search_col gin_trgm_ops);
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('area');
        });
    }
}
exports.CreateAreaTable1621783869513 = CreateAreaTable1621783869513;
//# sourceMappingURL=1621783869513-CreateAreaTable.js.map