import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDiarySyncFailedTable1625378377876 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'diary_sync_failed',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'diary_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'action',
                    type: 'varchar(10)',
                    isNullable: false,
                },
                {
                    name: 'last_error',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'retried_time',
                    type: 'int',
                    isNullable: false,
                    default: 0,
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
            ],
        });
        return queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.dropTable('diary_sync_failed');
    }
}
