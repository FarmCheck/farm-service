"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTargetTypeTable1621775639177 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateTargetTypeTable1621775639177 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'target_type',
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
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('target_type');
        });
    }
}
exports.CreateTargetTypeTable1621775639177 = CreateTargetTypeTable1621775639177;
//# sourceMappingURL=1621775639177-CreateTargetTypeTable.js.map