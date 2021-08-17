"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Diary, (faker, settings) => {
    const { stepID, sectionID, urls } = settings;
    const diary = new models_1.Diary();
    diary.id = uuid.v1();
    diary.stepID = stepID;
    diary.sectionID = sectionID;
    diary.name = faker.name.findName();
    diary.description = faker.lorem.sentence();
    diary.urls = urls;
    return diary;
});
//# sourceMappingURL=DiaryFactory.js.map