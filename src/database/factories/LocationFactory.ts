import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';

import { Location } from '../../api/models';

define(Location, (faker: typeof Faker, settings: {
    province: string,
    provinceCode: string,
    district: string,
    districtCode: string
}) => {
    const {province, provinceCode, district, districtCode} = settings;
    const location = new Location();

    location.id = uuid.v1();
    location.province = province;
    location.provinceCode = provinceCode;
    location.district = district;
    location.districtCode = districtCode;

    return location;
});
