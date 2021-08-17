"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.CertificationAble, (faker, settings) => {
    const { targetID, targetTypeID, organizationID, certificationID, urls } = settings;
    const certificationAble = new models_1.CertificationAble();
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
//# sourceMappingURL=CertificationAbleFactory.js.map