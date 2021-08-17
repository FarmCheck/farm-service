import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFarmPaymentTable1621777054277 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'farm_payment',
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
                    name: 'type',
                    type: 'smallint',
                    isNullable: false,
                },
                {
                    name: 'provider',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'account_no',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'expired_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
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
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('farm_payment');
    }
}
