import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductObjectTable1621787781237 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'product_object',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'product_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'process_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'area_id',
                    type: 'uuid',
                    isNullable: false,
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
                // 0: 'field plant', 1: 'farming plant', 2: 'production plant'
                {
                    name: 'type',
                    type: 'smallint',
                    isNullable: false,
                    default: 0,
                },
                // 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others'
                {
                    name: 'object_type',
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
            CREATE TRIGGER product_object_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON product_object FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX product_object_full_text_search_idx ON product_object USING GIN(full_text_search_col gin_trgm_ops);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product_object');
    }
}
