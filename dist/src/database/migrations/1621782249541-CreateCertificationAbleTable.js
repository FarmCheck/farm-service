"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCertificationAbleTable1621782249541 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateCertificationAbleTable1621782249541 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
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
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('certification_able');
        });
    }
}
exports.CreateCertificationAbleTable1621782249541 = CreateCertificationAbleTable1621782249541;
//# sourceMappingURL=1621782249541-CreateCertificationAbleTable.js.map