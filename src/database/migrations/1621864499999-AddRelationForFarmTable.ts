import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForFarmTable1621864499999 implements MigrationInterface {

    private toLocation = new TableForeignKey({
        name: 'fk_farm_location',
        columnNames: ['location_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'location',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('farm', this.toLocation);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('farm', this.toLocation);
    }

}
