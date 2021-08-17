"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForDiaryTable1621864120319 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForDiaryTable1621864120319 {
    constructor() {
        this.toStep = new typeorm_1.TableForeignKey({
            name: 'fk_diary_step',
            columnNames: ['step_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'step',
        });
        this.toSection = new typeorm_1.TableForeignKey({
            name: 'fk_diary_section',
            columnNames: ['section_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'section',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('diary', this.toStep);
            yield queryRunner.createForeignKey('diary', this.toSection);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('diary', this.toStep);
            yield queryRunner.dropForeignKey('diary', this.toSection);
        });
    }
}
exports.AddRelationForDiaryTable1621864120319 = AddRelationForDiaryTable1621864120319;
//# sourceMappingURL=1621864120319-AddRelationForDiaryTable.js.map