"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const Certification_1 = tslib_1.__importDefault(require("../../init/Certification"));
const models_1 = require("../../../api/models");
const common_1 = require("../../../common");
common_1.Helper.getLoadedConnectionOptions().then((connectionOptions) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    typeorm_1.createConnection(connectionOptions)
        .then((connection) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        console.log('Seeding certification...');
        for (const certification of Certification_1.default) {
            const entity = new models_1.Certification();
            entity.id = uuid_1.default.v1();
            entity.name = certification.name;
            entity.code = certification.code;
            entity.logo = certification.logo;
            yield connection.manager.save(entity);
        }
    }));
}));
//# sourceMappingURL=03-InitCertification.js.map