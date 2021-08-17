"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArea = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const Faker = tslib_1.__importStar(require("faker"));
const models_1 = require("../../../api/models");
const common_1 = require("../../../common");
class CreateArea {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const farms = yield connection.manager.find(models_1.Farm, { relations: ['location'] });
            const employees = yield connection.manager.find(models_1.Employee, { select: ['id'] });
            const seq = {};
            const areas = [];
            yield typeorm_seeding_1.times(farms.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const randomAreaCount = Faker.random.number(2) + 1;
                yield typeorm_seeding_1.times(randomAreaCount, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const name = Faker.address.city();
                    const [provinceCode, nameCode] = yield Promise.all([
                        common_1.Helper.combineFirstCharacterAndLastWord(farms[i].location.province),
                        common_1.Helper.combineFirstCharacterAndLastWord(name),
                    ]);
                    const prefixCode = `${provinceCode}-${nameCode}`;
                    let indexCode = 1;
                    if (seq.hasOwnProperty(prefixCode)) {
                        indexCode = ++seq[prefixCode];
                    }
                    else {
                        seq[prefixCode] = indexCode;
                    }
                    const employee = employees[Faker.random.number(employees.length - 1)];
                    areas.push(yield factory(models_1.Area)({
                        locationID: farms[i].location.id,
                        farmID: farms[i].id,
                        employeeID: employee.id,
                        code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                        name,
                    }).make());
                }));
            }));
            yield connection.manager.save(areas, {
                chunk: 50,
            });
        });
    }
}
exports.CreateArea = CreateArea;
//# sourceMappingURL=04-CreateArea.js.map