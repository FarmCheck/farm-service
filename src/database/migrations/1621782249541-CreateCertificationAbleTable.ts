import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCertificationAbleTable1621782249541 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'certification_able',
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
                    name: 'organization_id',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                    name: 'certification_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },
                {
                    name: 'effective_at',
                    type: 'timestamp',
                    isNullable: false,
                    default: "now() + interval '1 month'",
                },
                {
                    name: 'urls',
                    type: 'text[]',
                    isNullable: false,
                    default: "'{}'",
                },
            ],
        });

        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('certification_able');
    }
}
