"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmCategory = void 0;
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const Faker = tslib_1.__importStar(require("faker"));
const models_1 = require("../../../api/models");
class CreateFarmCategory {
    seed(factory, connection) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const farms = yield connection.manager.find(models_1.Farm, { select: ['id'] });
            const categories = yield connection.manager.find(models_1.Category, { select: ['id'] });
            const farmCategories = [];
            yield typeorm_seeding_1.times(farms.length, (i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const category = categories[Faker.random.number(categories.length - 1)];
                farmCategories.push(yield factory(models_1.FarmCategory)({
                    farmID: farms[i].id,
                    categoryID: category.id,
                }).make());
            }));
            yield connection.manager.save(farmCategories, {
                chunk: 100,
            });
        });
    }
}
exports.CreateFarmCategory = CreateFarmCategory;
//# sourceMappingURL=18-CreateFarmCategory.js.map