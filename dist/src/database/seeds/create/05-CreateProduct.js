"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const faker = tslib_1.__importStar(require("faker"));
const models_1 = require("../../../api/models");
const common_1 = require("../../../common");
class CreateProduct {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const subCategories = yield connection.manager.find(models_1.SubCategory, { select: ['id', 'code'] });
            const locations = yield connection.manager.find(models_1.Location, { select: ['id'] });
            const farms = yield connection.manager.find(models_1.Farm, { select: ['id'] });
            const seq = {};
            const seqFarm = {};
            const products = [];
            yield typeorm_seeding_1.times(farms.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const amount = faker.random.number(10);
                for (let j = 0; j < amount; ++j) {
                    const subCategory = subCategories[faker.random.number(subCategories.length - 1)];
                    const location = locations[faker.random.number(locations.length - 1)];
                    const name = faker.commerce.product();
                    const prefixCode = `${subCategory.code}-${yield common_1.Helper.combineFirstCharacterAndLastWord(name)}`;
                    let indexCode = 1;
                    if (seq.hasOwnProperty(prefixCode)) {
                        indexCode = ++seq[prefixCode];
                    }
                    else {
                        seq[prefixCode] = indexCode;
                    }
                    const product = yield factory(models_1.Product)({
                        farmID: farms[i].id,
                        subCategoryID: subCategory.id,
                        locationID: location.id,
                        code: `${prefixCode}-${indexCode.toString().padStart(4, '0')}`,
                        name,
                    }).make();
                    products.push(product);
                    if (seqFarm[product.farmID]) {
                        seqFarm[product.farmID]++;
                    }
                    else {
                        seqFarm[product.farmID] = 1;
                    }
                }
            }));
            for (const farm of farms) {
                if (seqFarm[farm.id]) {
                    farm.productsTotal = seqFarm[farm.id];
                }
            }
            yield connection.transaction((manager) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield manager.save(products, { chunk: 100 });
                yield manager.save(farms);
            }));
        });
    }
}
exports.CreateProduct = CreateProduct;
//# sourceMappingURL=05-CreateProduct.js.map