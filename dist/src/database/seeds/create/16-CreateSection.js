"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSection = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const models_1 = require("../../../api/models");
const faker_1 = tslib_1.__importDefault(require("faker"));
const common_1 = require("../../../common");
class CreateSection {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productObjects = yield connection.manager.find(models_1.ProductObject);
            const seq = {};
            const sections = [];
            yield typeorm_seeding_1.times(productObjects.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                for (let j = 0; j < 3; ++j) {
                    const name = faker_1.default.commerce.productName();
                    const prefixCode = yield common_1.Helper.combineFirstCharacterAndLastWord(name);
                    let indexCode = 1;
                    if (seq.hasOwnProperty(prefixCode)) {
                        indexCode = ++seq[prefixCode];
                    }
                    else {
                        seq[prefixCode] = indexCode;
                    }
                    const section = yield factory(models_1.Section)({
                        productObjectID: productObjects[i].id,
                        processID: productObjects[i].processID,
                        areaID: productObjects[i].areaID,
                        code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                        name,
                    }).make();
                    sections.push(section);
                }
            }));
            yield connection.manager.save(sections, {
                chunk: 100,
            });
        });
    }
}
exports.CreateSection = CreateSection;
//# sourceMappingURL=16-CreateSection.js.map