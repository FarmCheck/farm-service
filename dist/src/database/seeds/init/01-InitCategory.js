"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../../api/models");
const Category_1 = tslib_1.__importDefault(require("../../init/Category"));
const SubCategory_1 = tslib_1.__importDefault(require("../../init/SubCategory"));
const common_1 = require("../../../common");
common_1.Helper.getLoadedConnectionOptions().then((connectionOptions) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    typeorm_1.createConnection(connectionOptions)
        .then((connection) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        console.log('Seeding category and sub_category...');
        for (const category of Category_1.default) {
            const newCategory = new models_1.Category();
            newCategory.id = uuid.v1();
            newCategory.name = category.name;
            newCategory.code = category.code;
            newCategory.note = category.note;
            newCategory.url = category.url;
            newCategory.urlThumbnail = category.url_thumbnail;
            yield connection.manager.save(newCategory);
            const subcategories_1 = category.subcategories_1;
            if (subcategories_1 === undefined || subcategories_1 === null || subcategories_1.length === 0) {
                continue;
            }
            for (const category_sub1_name of subcategories_1) {
                const category_sub1 = SubCategory_1.default[category_sub1_name];
                if (category_sub1 === undefined) {
                    continue;
                }
                const newCategorySub1 = new models_1.SubCategory();
                newCategorySub1.id = uuid.v1();
                newCategorySub1.categoryID = newCategory.id;
                newCategorySub1.name = category_sub1_name;
                newCategorySub1.code = category_sub1.code;
                newCategorySub1.note = category_sub1.note;
                newCategorySub1.url = category_sub1.url;
                newCategorySub1.urlThumbnail = category_sub1.url_thumbnail;
                yield connection.manager.save(newCategorySub1);
            }
        }
    }));
}));
//# sourceMappingURL=01-InitCategory.js.map