import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForStepPropertyTable1621866044208 implements MigrationInterface {

    private toStep = new TableForeignKey({
        name: 'fk_stepproperty_step',
        columnNames: ['step_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'step',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('step_property', this.toStep);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('step_property', this.toStep);
    }

}
