import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProcessTable1621787633843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
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

        await queryRunner.createTable(table);
        await queryRunner.query(`
            CREATE TRIGGER process_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON process FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX process_full_text_search_idx ON process USING GIN(full_text_search_col gin_trgm_ops);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('process');
    }
}
