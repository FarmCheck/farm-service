"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaAbleTable1621786651096 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class CreateMediaAbleTable1621786651096 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = new typeorm_1.Table({
                name: 'media_able',
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
                        name: 'media_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                ],
            });
            yield queryRunner.createTable(table);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('media_able');
        });
    }
}
exports.CreateMediaAbleTable1621786651096 = CreateMediaAbleTable1621786651096;
//# sourceMappingURL=1621786651096-CreateMediaAbleTable.js.map