"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmTable1621775639046 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateFarmTable1621775639046 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'farm',
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
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'products_total',
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
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'is_verified_phone_number',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'is_verified_email',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
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
                        name: 'phoneNumber',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'website',
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
            DROP FUNCTION IF EXISTS vn_unaccent(varchar);
            CREATE FUNCTION vn_unaccent(varchar)
              RETURNS text AS
            $func$
            SELECT lower(translate($1,
            '???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????',
            '123AAAAAAAAAAAAAAaaaaaaaaaaaaaaAaAAAAAAaaaaaaAaCcCcCcCcCcDdDdEEEEEEEEEeeeeeeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIIIIiiiiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOOOOOOOOOOOOOOOOOOooooooooooooooooooOoOoOoEeOoRrRrRrSSsSsSsSsTtTtTtUUUUUUUUUUUUuuuuuuuuuuuuUuUuUuUuUuUuWwYyyYyYZzZzZz????'));
            $func$ LANGUAGE sql IMMUTABLE;

            DROP FUNCTION IF EXISTS tsvector_trigger();
            CREATE FUNCTION tsvector_trigger() RETURNS trigger AS $$
            begin
                new.full_text_search_col := vn_unaccent(new.name);
                return new;
            end
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER farm_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON farm FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX farm_full_text_search_idx ON farm USING GIN(full_text_search_col gin_trgm_ops);
        `);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('farm');
        });
    }
}
exports.CreateFarmTable1621775639046 = CreateFarmTable1621775639046;
//# sourceMappingURL=1621775639046-CreateFarmTable.js.map