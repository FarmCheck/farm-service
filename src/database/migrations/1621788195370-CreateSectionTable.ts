import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSectionTable1621788195370 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'section',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'product_object_id',
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
                {
                    name: 'status',
                    type: 'smallint',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'type',
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
                    name: 'diaries_total',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                },
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('section');
    }
}
