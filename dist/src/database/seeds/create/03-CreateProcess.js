"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProcess = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const Faker = tslib_1.__importStar(require("faker"));
const models_1 = require("../../../api/models");
const common_1 = require("../../../common");
class CreateProcess {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const farms = yield connection.manager.find(models_1.Farm);
            const seq = {};
            const processes = [];
            yield typeorm_seeding_1.times(farms.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                for (let j = 0; j < 2; ++j) {
                    const name = Faker.commerce.productName();
                    const prefixCode = yield common_1.Helper.combineFirstCharacterAndLastWord(name);
                    let indexCode = 1;
                    if (seq.hasOwnProperty(prefixCode)) {
                        indexCode = ++seq[prefixCode];
                    }
                    else {
                        seq[prefixCode] = indexCode;
                    }
                    processes.push(yield factory(models_1.Process)({
                        farmID: farms[i].id,
                        code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                        name,
                    }).make());
                }
            }));
            yield connection.manager.save(processes, { chunk: 100 });
        });
    }
}
exports.CreateProcess = CreateProcess;
//# sourceMappingURL=03-CreateProcess.js.map