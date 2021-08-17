import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductTable1621784333245 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
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

        await queryRunner.createTable(table);
        await queryRunner.query(`
            CREATE TRIGGER product_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON product FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX product_full_text_search_idx ON product USING GIN(full_text_search_col gin_trgm_ops);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product');
    }

}
