import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForDiaryTable1621864120319 implements MigrationInterface {

    private toStep = new TableForeignKey({
        name: 'fk_diary_step',
        columnNames: ['step_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'step',
    });

    private toSection = new TableForeignKey({
        name: 'fk_diary_section',
        columnNames: ['section_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'section',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('diary', this.toStep);
        await queryRunner.createForeignKey('diary', this.toSection);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('diary', this.toStep);
        await queryRunner.dropForeignKey('diary', this.toSection);
    }
}
