"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDiaryHashTable1621786892423 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateDiaryHashTable1621786892423 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'diary_hash',
                columns: [
                    {
                        name: 'diary_id',
                        type: 'uuid',
                        isPrimary: true,
                        isNullable: false,
                    },
                    {
                        name: 'hash',
                        type: 'varchar(255)',
                        isNullable: false,
                        isUnique: true,
                    },
                    {
                        name: 'height',
                        type: 'int',
                        isNullable: false,
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('diary_hash');
        });
    }
}
exports.CreateDiaryHashTable1621786892423 = CreateDiaryHashTable1621786892423;
//# sourceMappingURL=1621786892423-CreateDiaryHashTable.js.map