import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForFarmPaymentTable1621864942492 implements MigrationInterface {

    private toFarm = new TableForeignKey({
        name: 'fk_farmpayment_farm',
        columnNames: ['farm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'farm',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('farm_payment', this.toFarm);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('farm_payment', this.toFarm);
    }

}
