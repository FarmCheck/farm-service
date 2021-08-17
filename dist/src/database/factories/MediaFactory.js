"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.Media, (faker) => {
    const media = new models_1.Media();
    media.id = uuid.v1();
    media.type = faker.random.number(2);
    media.urlThumbnail = media.url = 'https://www.vietnam-briefing.com/news/wp-content/uploads/2019/04/VB-mag-image-1.jpg';
    return media;
});
//# sourceMappingURL=MediaFactory.js.map