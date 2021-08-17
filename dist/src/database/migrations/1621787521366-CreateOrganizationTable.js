"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrganizationTable1621787521366 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateOrganizationTable1621787521366 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'organization',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'logo',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: false,
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('category');
        });
    }
}
exports.CreateOrganizationTable1621787521366 = CreateOrganizationTable1621787521366;
//# sourceMappingURL=1621787521366-CreateOrganizationTable.js.map