import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStepTable1621788391134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'step',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'process_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'is_internal',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'order',
                    type: 'smallint',
                    comment: 'Order in process',
                    isNullable: false,
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
        await queryRunner.dropTable('step');
    }
}
