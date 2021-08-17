"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForStepTable1621865952267 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForStepTable1621865952267 {
    constructor() {
        this.toProcess = new typeorm_1.TableForeignKey({
            name: 'fk_step_process',
            columnNames: ['process_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'process',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('step', this.toProcess);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('step', this.toProcess);
        });
    }
}
exports.AddRelationForStepTable1621865952267 = AddRelationForStepTable1621865952267;
//# sourceMappingURL=1621865952267-AddRelationForStepTable.js.map