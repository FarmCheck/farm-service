import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMediaAbleTable1621786651096 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'media_able',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'target_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'target_type_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'media_id',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('media_able');
    }
}
