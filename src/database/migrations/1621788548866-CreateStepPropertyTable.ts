import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStepPropertyTable1621788548866 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'step_property',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'step_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'is_required',
                    type: 'boolean',
                    isNullable: false,
                    default: false,
                },
                {
                    name: 'type',
                    type: 'smallint',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'value',
                    type: 'varchar',
                    isNullable: false,
                },
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('step_property');
    }

}
