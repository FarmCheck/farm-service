"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForDiaryHashTable1622083681198 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForDiaryHashTable1622083681198 {
    constructor() {
        this.hashToDiary = new typeorm_1.TableForeignKey({
            name: 'fk_diaryHash_diary',
            columnNames: ['diary_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'diary',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('diary_hash', this.hashToDiary);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('diary_hash', this.hashToDiary.name);
        });
    }
}
exports.AddRelationForDiaryHashTable1622083681198 = AddRelationForDiaryHashTable1622083681198;
//# sourceMappingURL=1622083681198-AddRelationForDiaryHashTable.js.map