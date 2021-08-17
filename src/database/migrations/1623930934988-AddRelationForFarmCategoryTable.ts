import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForFarmCategoryTable1623930934988 implements MigrationInterface {

    private toCategory = new TableForeignKey({
        name: 'fk_farmcategory_category',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
    });

    private toFarm = new TableForeignKey({
        name: 'fk_farmcategory_farm',
        columnNames: ['farm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'farm',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            queryRunner.createForeignKey('farm_category', this.toCategory),
            queryRunner.createForeignKey('farm_category', this.toFarm),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            queryRunner.dropForeignKey('farm_category', this.toCategory),
            queryRunner.dropForeignKey('farm_category', this.toFarm),
        ]);
    }

}
