import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployeeTable1621783869613 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
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

        await queryRunner.createTable(table);
        await queryRunner.query(`
            CREATE TRIGGER employee_full_text_search_trigger BEFORE INSERT OR UPDATE
                ON employee FOR EACH ROW EXECUTE PROCEDURE tsvector_trigger();

            CREATE INDEX employee_full_text_search_idx ON employee USING GIN(full_text_search_col gin_trgm_ops);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('employee');
    }
}
