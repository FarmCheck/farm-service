import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { ProductObject } from '../../api/models';

define(ProductObject, (faker: typeof Faker, settings: {
    productID: string,
    processID: string,
    areaID: string,
    code: string,
    name: string,
}) => {
    const {productID, processID, areaID, code, name} = settings;
    const product = new ProductObject();

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
