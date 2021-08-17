"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStepTable1621788391134 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateStepTable1621788391134 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'step',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'process_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'is_internal',
                        type: 'boolean',
                        isNullable: false,
                        default: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    },
                    {
                        name: 'order',
                        type: 'smallint',
                        comment: 'Order in process',
                        isNullable: false,
                    },
                    {
                        name: 'diaries_total',
                        type: 'int',
                        isNullable: false,
                        default: 0,
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('step');
        });
    }
}
exports.CreateStepTable1621788391134 = CreateStepTable1621788391134;
//# sourceMappingURL=1621788391134-CreateStepTable.js.map