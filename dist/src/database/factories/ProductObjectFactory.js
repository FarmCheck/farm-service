"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.ProductObject, (faker, settings) => {
    const { productID, processID, areaID, code, name } = settings;
    const product = new models_1.ProductObject();
    product.id = uuid.v1();
    product.productID = productID;
    product.processID = processID;
    product.areaID = areaID;
    product.code = code;
    product.name = name;
    // 0: 'field plant', 1: 'farming plant', 2: 'production plant'
    product.type = faker.random.number(2);
    // 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others'
    product.objectType = faker.random.number(5);
    product.description = faker.lorem.sentence();
    return product;
});
//# sourceMappingURL=ProductObjectFactory.js.map