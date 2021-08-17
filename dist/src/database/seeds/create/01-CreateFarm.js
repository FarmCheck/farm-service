"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarm = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const axios_1 = tslib_1.__importDefault(require("axios"));
const Faker = tslib_1.__importStar(require("faker"));
const models_1 = require("../../../api/models");
const env_1 = require("../../../env");
const common_1 = require("../../../common");
class CreateFarm {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const locations = yield connection.manager.find(models_1.Location);
            // get list user ID in User Service
            const userRes = yield axios_1.default.create({ baseURL: env_1.env.farmhub.userService })({
                url: '/users/another-service/list-id',
                // headers: {authorization: `Bearer ${token}`},
                method: 'GET',
            });
            const { data } = userRes;
            const { data: userIDs } = data;
            const seq = {};
            yield typeorm_seeding_1.times(locations.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const idx = Math.floor(Math.random() * userIDs.length);
                const name = Faker.address.city();
                const [provinceCode, nameCode] = yield Promise.all([
                    common_1.Helper.combineFirstCharacterAndLastWord(locations[i].province),
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
                const farm = yield factory(models_1.Farm)({
                    locationID: locations[i].id,
                    userID: userIDs[idx],
                    code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                    name,
                }).seed();
                // sync farm ID amd user ID in Identity Service
                yield axios_1.default.create({ baseURL: env_1.env.farmhub.identityService })({
                    url: '/farm',
                    // headers: {authorization: `Bearer ${token}`},
                    method: 'POST',
                    data: { farmId: farm.id, userId: farm.userID },
                });
            }));
        });
    }
}
exports.CreateFarm = CreateFarm;
//# sourceMappingURL=01-CreateFarm.js.map