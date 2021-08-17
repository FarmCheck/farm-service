"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_seeding_1 = require("typeorm-seeding");
const uuid = tslib_1.__importStar(require("uuid"));
const models_1 = require("../../api/models");
typeorm_seeding_1.define(models_1.MediaAble, (faker, settings) => {
    const { targetID, targetTypeID, mediaID } = settings;
    const mediaAble = new models_1.MediaAble();
    mediaAble.id = uuid.v1();
    mediaAble.targetID = targetID;
    mediaAble.targetTypeID = targetTypeID;
    mediaAble.mediaID = mediaID;
    return mediaAble;
});
//# sourceMappingURL=MediaAbleFactory.js.map