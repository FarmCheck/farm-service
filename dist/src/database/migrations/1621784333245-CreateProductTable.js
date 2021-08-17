"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductTable1621784333245 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateProductTable1621784333245 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'product',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'location_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'farm_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'sub_category_id',
                        type: 'uuid',
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
                        name: 'barcode',
                        type: 'varchar',
                        isNullable: false,
                        default: "'0000000000000'",
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'unit',
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
                        name: 'duration',
                        type: 'smallint',
                        isNullable: true,
                    },
                    {
                        name: 'duration_type',
                        type: 'smallint',
                        isNullable: true,
                    },
                    {
                        name: 'price',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'is_have_brand',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'brand_name',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'brand_description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'tax_code',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'number_phone',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'website',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'logo',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'banner',
                        type: 'varchar',
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
            CREATE TRIGGER product_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON product FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX product_full_text_search_idx ON product USING GIN(full_text_search_col gin_trgm_ops);
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('product');
        });
    }
}
exports.CreateProductTable1621784333245 = CreateProductTable1621784333245;
//# sourceMappingURL=1621784333245-CreateProductTable.js.map