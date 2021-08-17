import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddColumnFarmIdToProcessTable1622130152632 implements MigrationInterface {
    private toFarm = new TableForeignKey({
        name: 'fk_process_farm',
        columnNames: ['farm_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'farm',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('process', new TableColumn({
            name: 'farm_id',
            type: 'uuid',
            isNullable: false,
        }));

        await queryRunner.createForeignKey('process', this.toFarm);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('process', 'farm_id');
        await queryRunner.dropForeignKey('process', this.toFarm);
    }
}
