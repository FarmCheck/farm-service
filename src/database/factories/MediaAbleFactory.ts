import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { MediaAble } from '../../api/models';

define(MediaAble, (faker: typeof Faker, settings: {
    targetID: string,
    targetTypeID: string,
    mediaID: string,
}) => {
    const {targetID, targetTypeID, mediaID } = settings;
    const mediaAble = new MediaAble();

    mediaAble.id = uuid.v1();
    mediaAble.targetID = targetID;
    mediaAble.targetTypeID = targetTypeID;
    mediaAble.mediaID = mediaID;

    return mediaAble;
});
