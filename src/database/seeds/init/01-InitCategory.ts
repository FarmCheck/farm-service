import { createConnection } from 'typeorm';
import * as uuid from 'uuid';

import { Category, SubCategory } from '../../../api/models';
import categories from '../../init/Category';
import subCategories1 from '../../init/SubCategory';
import { Helper } from '../../../common';

Helper.getLoadedConnectionOptions().then(async connectionOptions => {
    createConnection(connectionOptions)
        .then(async connection => {
            console.log('Seeding category and sub_category...');

            for (const category of categories) {
                const newCategory = new Category();

                newCategory.id = uuid.v1();
                newCategory.name = category.name;
                newCategory.code = category.code;
                newCategory.note = category.note;
                newCategory.url = category.url;
                newCategory.urlThumbnail = category.url_thumbnail;

                await connection.manager.save(newCategory);

                const subcategories_1 = category.subcategories_1;
                if (subcategories_1 === undefined || subcategories_1 === null || subcategories_1.length === 0) {
                    continue;
                }

                for (const category_sub1_name of subcategories_1) {
                    const category_sub1 = subCategories1[category_sub1_name];
                    if (category_sub1 === undefined) {
                        continue;
                    }

                    const newCategorySub1 = new SubCategory();

                    newCategorySub1.id = uuid.v1();
                    newCategorySub1.categoryID = newCategory.id;
                    newCategorySub1.name = category_sub1_name;
                    newCategorySub1.code = category_sub1.code;
                    newCategorySub1.note = category_sub1.note;
                    newCategorySub1.url = category_sub1.url;
                    newCategorySub1.urlThumbnail = category_sub1.url_thumbnail;

                    await connection.manager.save(newCategorySub1);
                }
            }
        });
});
