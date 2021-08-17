import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForMediaAble1621863195664 implements MigrationInterface {

    private toTargetType = new TableForeignKey({
        name: 'fk_mediaable_targettype',
        columnNames: ['target_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'target_type',
    });

    private toMedia = new TableForeignKey({
        name: 'fk_mediaable_media',
        columnNames: ['media_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'media',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('media_able', this.toTargetType);
        await queryRunner.createForeignKey('media_able', this.toMedia);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('media_able', this.toTargetType);
        await queryRunner.dropForeignKey('media_able', this.toMedia);
    }

}
