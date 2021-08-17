import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationToProductTable1622129447063 implements MigrationInterface {
    private toLocation = new TableForeignKey({
        name: 'fk_product_location',
        columnNames: ['location_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'location',
    });

    private toFarm = new TableForeignKey({
        name: 'fk_product_farm',
        columnNames: ['farm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'farm',
    });

    private toSubCategory = new TableForeignKey({
        name: 'fk_product_subcategory',
        columnNames: ['sub_category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sub_category',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('product', this.toLocation);
        await queryRunner.createForeignKey('product', this.toFarm);
        await queryRunner.createForeignKey('product', this.toSubCategory);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('product', this.toLocation);
        await queryRunner.dropForeignKey('product', this.toFarm);
        await queryRunner.dropForeignKey('product', this.toSubCategory);
    }

}
