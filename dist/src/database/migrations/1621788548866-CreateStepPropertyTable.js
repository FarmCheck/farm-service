"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStepPropertyTable1621788548866 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateStepPropertyTable1621788548866 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'step_property',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'step_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'is_required',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'type',
                        type: 'smallint',
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: 'value',
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
            yield queryRunner.dropTable('step_property');
        });
    }
}
exports.CreateStepPropertyTable1621788548866 = CreateStepPropertyTable1621788548866;
//# sourceMappingURL=1621788548866-CreateStepPropertyTable.js.map