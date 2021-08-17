import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Media } from '../../api/models';

define(Media, (faker: typeof Faker) => {
    const media = new Media();
    media.id = uuid.v1();
    media.type = faker.random.number(2);
    media.urlThumbnail = media.url = 'https://www.vietnam-briefing.com/news/wp-content/uploads/2019/04/VB-mag-image-1.jpg';

    return media;
});
