import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDiaryHashTable1621786892423 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'diary_hash',
            columns: [
                {
                    name: 'diary_id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'hash',
                    type: 'varchar(255)',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'height',
                    type: 'int',
                    isNullable: false,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('diary_hash');
    }
}
