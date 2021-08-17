import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForDiaryHashTable1622083681198 implements MigrationInterface {
    private hashToDiary = new TableForeignKey({
        name: 'fk_diaryHash_diary',
        columnNames: ['diary_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'diary',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('diary_hash', this.hashToDiary);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('diary_hash', this.hashToDiary.name);
    }
}
