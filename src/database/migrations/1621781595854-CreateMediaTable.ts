import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMediaTable1621781595854 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'media',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'type',
                    type: 'smallint',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'url',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'url_thumbnail',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('media');
    }

}
