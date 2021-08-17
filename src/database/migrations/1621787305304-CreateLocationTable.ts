import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLocationTable1621787305304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'location',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'province',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'province_code',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'district',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'district_code',
                    type: 'varchar',
                    isNullable: false,
                },
                // 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft',
                {
                    name: 'status',
                    type: 'smallint',
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

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('location');
    }

}
