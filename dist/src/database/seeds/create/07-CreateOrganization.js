"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrganization = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../../../api/models");
class CreateOrganization {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield factory(models_1.Organization)().seedMany(30);
        });
    }
}
exports.CreateOrganization = CreateOrganization;
//# sourceMappingURL=07-CreateOrganization.js.map