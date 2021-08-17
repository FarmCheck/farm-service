"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForCertificationAbleTable1621863425749 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForCertificationAbleTable1621863425749 {
    constructor() {
        this.toTargetType = new typeorm_1.TableForeignKey({
            name: 'fk_certificationable_targettype',
            columnNames: ['target_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'target_type',
        });
        this.toOrganization = new typeorm_1.TableForeignKey({
            name: 'fk_certificationable_organization',
            columnNames: ['organization_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'organization',
        });
        this.toCertification = new typeorm_1.TableForeignKey({
            name: 'fk_certificationable_certification',
            columnNames: ['certification_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'certification',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('certification_able', this.toTargetType);
            yield queryRunner.createForeignKey('certification_able', this.toOrganization);
            yield queryRunner.createForeignKey('certification_able', this.toCertification);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('certification_able', this.toTargetType);
            yield queryRunner.dropForeignKey('certification_able', this.toOrganization);
            yield queryRunner.dropForeignKey('certification_able', this.toCertification);
        });
    }
}
exports.AddRelationForCertificationAbleTable1621863425749 = AddRelationForCertificationAbleTable1621863425749;
//# sourceMappingURL=1621863425749-AddRelationForCertificationAbleTable.js.map