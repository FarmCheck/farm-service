"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMediaAble = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const models_1 = require("../../../api/models");
const faker_1 = tslib_1.__importDefault(require("faker"));
class CreateMediaAble {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = yield connection.manager.find(models_1.Product, { select: ['id'] });
            const areas = yield connection.manager.find(models_1.Area, { select: ['id'] });
            const farms = yield connection.manager.find(models_1.Farm, { select: ['id'] });
            const productObjects = yield connection.manager.find(models_1.ProductObject, { select: ['id'] });
            const targetTypes = yield connection.manager.find(models_1.TargetType);
            const medias = yield connection.manager.find(models_1.Media, { select: ['id'] });
            const entities = [];
            const { id: targetTypeProductID } = targetTypes.find(e => e.name === 'product');
            yield typeorm_seeding_1.times(products.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                entities.push(yield this.createNewMediaAble(factory, connection, medias, { targetID: products[i].id, targetTypeID: targetTypeProductID }));
            }));
            const { id: targetTypeAreaID } = targetTypes.find(e => e.name === 'area');
            yield typeorm_seeding_1.times(areas.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                entities.push(yield this.createNewMediaAble(factory, connection, medias, { targetID: areas[i].id, targetTypeID: targetTypeAreaID }));
            }));
            const { id: targetTypeFarmID } = targetTypes.find(e => e.name === 'farm');
            yield typeorm_seeding_1.times(farms.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                entities.push(yield this.createNewMediaAble(factory, connection, medias, { targetID: farms[i].id, targetTypeID: targetTypeFarmID }));
            }));
            const { id: targetTypeProductObjectID } = targetTypes.find(e => e.name === 'product_object');
            yield typeorm_seeding_1.times(productObjects.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                entities.push(yield this.createNewMediaAble(factory, connection, medias, { targetID: productObjects[i].id, targetTypeID: targetTypeProductObjectID }));
            }));
            yield connection.manager.save(entities, {
                chunk: 100,
            });
        });
    }
    createNewMediaAble(factory, connection, medias, target) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const media = medias[faker_1.default.random.number(medias.length - 1)];
            const { targetID, targetTypeID } = target;
            return yield factory(models_1.MediaAble)({
                targetID,
                targetTypeID,
                mediaID: media.id,
            }).make();
        });
    }
}
exports.CreateMediaAble = CreateMediaAble;
//# sourceMappingURL=19-CreateMediaAble.js.map