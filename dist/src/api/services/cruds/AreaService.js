"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreaService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
const common_1 = require("../common");
const routing_controllers_1 = require("routing-controllers");
const common_2 = require("../../../common");
let AreaService = class AreaService {
    constructor(areaRepository, locationRepository, dbHelper, log) {
        this.areaRepository = areaRepository;
        this.locationRepository = locationRepository;
        this.dbHelper = dbHelper;
        this.log = log;
    }
    getValidCodeInTransaction(queryRunner, area) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const location = yield this.locationRepository.findOne(area.locationID);
            if (!location) {
                throw new routing_controllers_1.HttpError(400, 'locationID is invalid');
            }
            const [provinceCode, nameCode] = yield Promise.all([
                common_2.Helper.combineFirstCharacterAndLastWord(location.province),
                common_2.Helper.combineFirstCharacterAndLastWord(area.name),
            ]);
            const prefixCode = `${provinceCode}-${nameCode}`;
            const findOneOptions = {
                where: { code: typeorm_1.Like(`${prefixCode}%`) },
                order: { createdAt: 'DESC' },
                select: ['code'],
            };
            return this.dbHelper.getValidCodeInTransaction(queryRunner, models_1.Area, findOneOptions, prefixCode, 4);
        });
    }
    find(option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all area');
            return this.dbHelper.findAndCount(this.areaRepository, option);
        });
    }
    create(area, medias, option = {}) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new area');
            area.id = uuid_1.default.v1();
            area.productObjectsTotal = 0;
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                area.code = (_a = area.code) !== null && _a !== void 0 ? _a : yield this.getValidCodeInTransaction(queryRunner, area);
                const result = yield queryRunner.manager.save(area);
                if (medias && medias.length !== 0) {
                    let awaiter = [];
                    // 0: image, 1: video, 2: document
                    for (const media of medias) {
                        const mediaEntity = new models_1.Media();
                        mediaEntity.id = uuid_1.default.v1();
                        mediaEntity.type = media.type;
                        mediaEntity.url = media.url;
                        mediaEntity.urlThumbnail = media.urlThumbnail;
                        awaiter.push(queryRunner.manager.save(mediaEntity));
                    }
                    const mediaEntities = yield Promise.all(awaiter);
                    const targetType = yield queryRunner.manager.findOne(models_1.TargetType, { name: 'area' });
                    awaiter = [];
                    for (const mediaEntity of mediaEntities) {
                        const mediaAble = new models_1.MediaAble();
                        mediaAble.id = uuid_1.default.v1();
                        mediaAble.targetID = result.id;
                        mediaAble.targetTypeID = targetType.id;
                        mediaAble.mediaID = mediaEntity.id;
                        awaiter.push(queryRunner.manager.save(mediaAble));
                    }
                    yield Promise.all(awaiter);
                }
                yield queryRunner.commitTransaction();
                return result;
            }
            catch (err) {
                yield queryRunner.rollbackTransaction();
                throw err;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    findOne(id, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find one area');
            const result = yield this.dbHelper.findOne(this.areaRepository, id, option);
            if (!result) {
                return result;
            }
            return result;
        });
    }
    update(id, area, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a area');
            delete area.productObjectsTotal;
            yield this.areaRepository.update(id, area);
            return this.areaRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a area');
            const item = yield this.areaRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.areaRepository.delete(id);
            return item;
        });
    }
};
AreaService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.AreaRepository,
        repositories_1.LocationRepository,
        common_1.DbHelper, Object])
], AreaService);
exports.AreaService = AreaService;
//# sourceMappingURL=AreaService.js.map