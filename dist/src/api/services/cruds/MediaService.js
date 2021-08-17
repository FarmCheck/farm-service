"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
let MediaService = class MediaService {
    constructor(mediaRepository, log) {
        this.mediaRepository = mediaRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all media');
            const list = yield this.mediaRepository.findAndCount({
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
    create(media, targetID, targetType, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new media');
            media.id = uuid_1.default.v1();
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const result = yield queryRunner.manager.save(media);
                const targetTypeEntity = yield queryRunner.manager.findOne(models_1.TargetType, { name: targetType });
                const mediaAble = new models_1.MediaAble();
                mediaAble.id = uuid_1.default.v1();
                mediaAble.targetID = targetID;
                mediaAble.targetTypeID = targetTypeEntity.id;
                mediaAble.mediaID = result.id;
                yield queryRunner.manager.save(mediaAble);
                yield queryRunner.commitTransaction();
                return result;
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw error;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    findOne(id, option) {
        this.log.info('Find one media');
        return this.mediaRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, media, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a media');
            yield this.mediaRepository.update(id, media);
            return this.mediaRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a media');
            const item = yield this.mediaRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.mediaRepository.delete(id);
            return item;
        });
    }
};
MediaService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.MediaRepository, Object])
], MediaService);
exports.MediaService = MediaService;
//# sourceMappingURL=MediaService.js.map