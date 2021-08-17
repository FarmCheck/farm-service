import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategoryTable1621784333242 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'category',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'code',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'note',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'url_thumbnail',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('category');
    }

}
