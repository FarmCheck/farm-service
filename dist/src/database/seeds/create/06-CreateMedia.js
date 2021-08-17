"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMedia = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../../../api/models");
class CreateMedia {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const medias = yield factory(models_1.Media)().makeMany(5000);
            yield connection.manager.save(medias, {
                chunk: 100,
            });
        });
    }
}
exports.CreateMedia = CreateMedia;
//# sourceMappingURL=06-CreateMedia.js.map