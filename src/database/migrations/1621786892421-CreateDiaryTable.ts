import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDiaryTable1621786892421 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'diary',
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
                    name: 'section_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'urls',
                    type: 'text[]',
                    isNullable: false,
                    default: "'{}'",
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: true,
                    default: 'now()',
                },
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('diary');
    }
}
