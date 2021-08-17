import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForSectionTable1621865603421 implements MigrationInterface {

    private toProductObject = new TableForeignKey({
        name: 'fk_section_productobject',
        columnNames: ['product_object_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_object',
    });

    private toProcess = new TableForeignKey({
        name: 'fk_section_process',
        columnNames: ['process_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'process',
    });

    private toArea = new TableForeignKey({
        name: 'fk_section_area',
        columnNames: ['area_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'area',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('section', this.toProductObject);
        await queryRunner.createForeignKey('section', this.toProcess);
        await queryRunner.createForeignKey('section', this.toArea);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('section', this.toProductObject);
        await queryRunner.dropForeignKey('section', this.toProcess);
        await queryRunner.dropForeignKey('section', this.toArea);
    }

}
