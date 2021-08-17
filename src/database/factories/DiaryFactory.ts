import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Diary } from '../../api/models';

define(Diary, (faker: typeof Faker, settings: {
    stepID: string,
    sectionID: string,
    urls: string[]
}) => {
    const {stepID, sectionID, urls} = settings;
    const diary = new Diary();

    diary.id = uuid.v1();
    diary.stepID = stepID;
    diary.sectionID = sectionID;
    diary.name = faker.name.findName();
    diary.description = faker.lorem.sentence();
    diary.urls = urls;

    return diary;
});
