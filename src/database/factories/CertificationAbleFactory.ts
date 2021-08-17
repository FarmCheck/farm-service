import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { CertificationAble } from '../../api/models';

define(CertificationAble, (faker: typeof Faker, settings: {
    targetID: string,
    targetTypeID: string,
    certificationID: string,
    organizationID: string,
    urls: string[],
}) => {
    const { targetID, targetTypeID, organizationID, certificationID, urls } = settings;
    const certificationAble = new CertificationAble();

    certificationAble.id = uuid.v1();
    certificationAble.targetID = targetID;
    certificationAble.organizationID = organizationID;
    certificationAble.certificationID = certificationID;
    certificationAble.description = faker.lorem.sentence();
    certificationAble.targetTypeID = targetTypeID;
    // Type orm cannot seeding type array
    certificationAble.urls = urls;

    return certificationAble;
});
