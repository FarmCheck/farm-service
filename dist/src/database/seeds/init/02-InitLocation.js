"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const models_1 = require("../../../api/models");
const Location_1 = require("../../init/Location");
const typeorm_1 = require("typeorm");
const uuid = tslib_1.__importStar(require("uuid"));
const common_1 = require("../../../common");
common_1.Helper.getLoadedConnectionOptions().then((connectionOptions) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    typeorm_1.createConnection(connectionOptions)
        .then((connection) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        console.log('Seeding location...');
        for (const district of Location_1.Districts) {
            for (const province of Location_1.Provinces) {
                if (district.provincecode === province.code) {
                    const location = new models_1.Location();
                    location.id = uuid.v1();
                    location.province = province.name;
                    location.provinceCode = province.code;
                    location.district = district.name;
                    location.districtCode = district.code;
                    yield connection.manager.save(location);
                }
            }
        }
    }));
}));
//# sourceMappingURL=02-InitLocation.js.map