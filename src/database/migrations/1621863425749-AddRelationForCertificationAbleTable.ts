import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationForCertificationAbleTable1621863425749 implements MigrationInterface {

    private toTargetType = new TableForeignKey({
        name: 'fk_certificationable_targettype',
        columnNames: ['target_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'target_type',
    });

    private toOrganization = new TableForeignKey({
        name: 'fk_certificationable_organization',
        columnNames: ['organization_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'organization',
    });

    private toCertification = new TableForeignKey({
        name: 'fk_certificationable_certification',
        columnNames: ['certification_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'certification',
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('certification_able', this.toTargetType);
        await queryRunner.createForeignKey('certification_able', this.toOrganization);
        await queryRunner.createForeignKey('certification_able', this.toCertification);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('certification_able', this.toTargetType);
        await queryRunner.dropForeignKey('certification_able', this.toOrganization);
        await queryRunner.dropForeignKey('certification_able', this.toCertification);
    }

}
