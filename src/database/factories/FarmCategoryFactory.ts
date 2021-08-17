import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { FarmCategory } from '../../api/models';

define(FarmCategory, (faker: typeof Faker, settings: {
    farmID: string,
    categoryID: string
}) => {
    const { farmID, categoryID } = settings;
    const farmCategory = new FarmCategory();

    farmCategory.id = uuid.v1();
    farmCategory.farmID = farmID;
    farmCategory.categoryID = categoryID;

    return farmCategory;
});
