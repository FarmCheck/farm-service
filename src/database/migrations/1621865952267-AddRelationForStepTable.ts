import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForStepTable1621865952267 implements MigrationInterface {

    private toProcess = new TableForeignKey({
        name: 'fk_step_process',
        columnNames: ['process_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'process',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('step', this.toProcess);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('step', this.toProcess);
    }

}
