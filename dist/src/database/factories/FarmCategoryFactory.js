"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.FarmCategory, (faker, settings) => {
    const { farmID, categoryID } = settings;
    const farmCategory = new models_1.FarmCategory();
    farmCategory.id = uuid.v1();
    farmCategory.farmID = farmID;
    farmCategory.categoryID = categoryID;
    return farmCategory;
});
//# sourceMappingURL=FarmCategoryFactory.js.map