"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForStepPropertyTable1621866044208 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForStepPropertyTable1621866044208 {
    constructor() {
        this.toStep = new typeorm_1.TableForeignKey({
            name: 'fk_stepproperty_step',
            columnNames: ['step_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'step',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('step_property', this.toStep);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('step_property', this.toStep);
        });
    }
}
exports.AddRelationForStepPropertyTable1621866044208 = AddRelationForStepPropertyTable1621866044208;
//# sourceMappingURL=1621866044208-AddRelationForStepPropertyTable.js.map