"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCertificationTable1621775639045 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCertificationTable1621775639045 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'certification',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'logo',
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
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('certification');
        });
    }
}
exports.CreateCertificationTable1621775639045 = CreateCertificationTable1621775639045;
//# sourceMappingURL=1621775639045-CreateCertificationTable.js.map