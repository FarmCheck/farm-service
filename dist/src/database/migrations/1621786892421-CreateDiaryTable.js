"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiaryTable1621786892421 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateDiaryTable1621786892421 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'diary',
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
                        name: 'section_id',
                        type: 'uuid',
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
                        isNullable: true,
                    },
                    {
                        name: 'urls',
                        type: 'text[]',
                        isNullable: false,
                        default: "'{}'",
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        isNullable: true,
                        default: 'now()',
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('diary');
        });
    }
}
exports.CreateDiaryTable1621786892421 = CreateDiaryTable1621786892421;
//# sourceMappingURL=1621786892421-CreateDiaryTable.js.map