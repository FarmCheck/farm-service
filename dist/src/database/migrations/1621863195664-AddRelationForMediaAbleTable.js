"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRelationForMediaAble1621863195664 = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationForMediaAble1621863195664 {
    constructor() {
        this.toTargetType = new typeorm_1.TableForeignKey({
            name: 'fk_mediaable_targettype',
            columnNames: ['target_type_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'target_type',
        });
        this.toMedia = new typeorm_1.TableForeignKey({
            name: 'fk_mediaable_media',
            columnNames: ['media_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'media',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createForeignKey('media_able', this.toTargetType);
            yield queryRunner.createForeignKey('media_able', this.toMedia);
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('media_able', this.toTargetType);
            yield queryRunner.dropForeignKey('media_able', this.toMedia);
        });
    }
}
exports.AddRelationForMediaAble1621863195664 = AddRelationForMediaAble1621863195664;
//# sourceMappingURL=1621863195664-AddRelationForMediaAbleTable.js.map