"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAbleService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
let MediaAbleService = class MediaAbleService {
    constructor(mediaAbleRepository, log) {
        this.mediaAbleRepository = mediaAbleRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all media able');
            const list = yield this.mediaAbleRepository.findAndCount({
                skip: option.skip,
                take: option.take,
                select: option.select,
                where: option.where,
                relations: option.relations,
                order: option.order,
            });
            return { list: list[0], count: list[1] };
        });
    }
    create(mediaAble, option) {
        this.log.info('Create a new media able');
        mediaAble.id = uuid_1.default.v1();
        return this.mediaAbleRepository.save(mediaAble);
    }
    findOne(id, option) {
        this.log.info('Find one media able');
        return this.mediaAbleRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, mediaAble, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a media able');
            yield this.mediaAbleRepository.update(id, mediaAble);
            return this.mediaAbleRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a media able');
            const item = yield this.mediaAbleRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.mediaAbleRepository.delete(id);
            return item;
        });
    }
};
MediaAbleService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MediaAbleRepository, Object])
], MediaAbleService);
exports.MediaAbleService = MediaAbleService;
//# sourceMappingURL=MediaAbleService.js.map