import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForSubCategoryTable1621863425745 implements MigrationInterface {

    private toCategory = new TableForeignKey({
        name: 'fk_subcategory_category',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('sub_category', this.toCategory);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('sub_category', this.toCategory);
    }

}
