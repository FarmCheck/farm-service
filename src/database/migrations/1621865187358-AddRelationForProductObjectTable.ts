import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForProductObjectTable1621865187358 implements MigrationInterface {

    private toProduct = new TableForeignKey({
        name: 'fk_productobject_product',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
    });

    private toProcess = new TableForeignKey({
        name: 'fk_productobject_process',
        columnNames: ['process_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'process',
    });

    private toArea = new TableForeignKey({
        name: 'fk_productobject_area',
        columnNames: ['area_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'area',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('product_object', this.toProduct);
        await queryRunner.createForeignKey('product_object', this.toProcess);
        await queryRunner.createForeignKey('product_object', this.toArea);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('product_object', this.toProduct);
        await queryRunner.dropForeignKey('product_object', this.toProcess);
        await queryRunner.dropForeignKey('product_object', this.toArea);
    }

}
