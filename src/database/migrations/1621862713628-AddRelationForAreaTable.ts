import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForAreaTable1621862713628 implements MigrationInterface {

    private toLocation = new TableForeignKey({
        name: 'fk_area_location',
        columnNames: ['location_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'location',
    });

    private toEmployee = new TableForeignKey({
        name: 'fk_area_employee',
        columnNames: ['employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'employee',
    });

    private toFarm = new TableForeignKey({
        name: 'fk_area_farm',
        columnNames: ['farm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'farm',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('area', this.toLocation);
        await queryRunner.createForeignKey('area', this.toEmployee);
        await queryRunner.createForeignKey('area', this.toFarm);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('area', this.toLocation);
        await queryRunner.dropForeignKey('area', this.toEmployee);
        await queryRunner.dropForeignKey('area', this.toFarm);
    }

}
