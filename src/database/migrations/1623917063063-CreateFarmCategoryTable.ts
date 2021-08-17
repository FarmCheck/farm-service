import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFarmCategoryTable1623917063063 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'farm_category',
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
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('farm_category');
    }

}
