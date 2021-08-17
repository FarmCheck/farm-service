"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const axios_1 = tslib_1.__importDefault(require("axios"));
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const routing_controllers_1 = require("routing-controllers");
const Logger_1 = require("../../../decorators/Logger");
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
const DbHelper_1 = require("../common/DbHelper");
const env_1 = require("../../../env");
const common_1 = require("../../../common");
let FarmService = class FarmService {
    constructor(farmRepository, categoryRepository, areaRepository, productObjectRepository, processRepository, sectionRepository, locationRepository, dbHelper, log) {
        this.farmRepository = farmRepository;
        this.categoryRepository = categoryRepository;
        this.areaRepository = areaRepository;
        this.productObjectRepository = productObjectRepository;
        this.processRepository = processRepository;
        this.sectionRepository = sectionRepository;
        this.locationRepository = locationRepository;
        this.dbHelper = dbHelper;
        this.log = log;
    }
    find(option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all farm');
            return this.dbHelper.findAndCount(this.farmRepository, option);
        });
    }
    getValidCodeInTransaction(queryRunner, farm) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const location = yield this.locationRepository.findOne(farm.locationID);
            if (!location) {
                throw new routing_controllers_1.HttpError(400, 'locationID is invalid');
            }
            const [provinceCode, nameCode] = yield Promise.all([
                common_1.Helper.combineFirstCharacterAndLastWord(location.province),
                common_1.Helper.combineFirstCharacterAndLastWord(farm.name),
            ]);
            const prefixCode = `${provinceCode}-${nameCode}`;
            const findOneOptions = {
                where: { code: typeorm_1.Like(`${prefixCode}%`) },
                order: { createdAt: 'DESC' },
                select: ['code'],
            };
            return this.dbHelper.getValidCodeInTransaction(queryRunner, models_1.Farm, findOneOptions, prefixCode, 4);
        });
    }
    create(farm, medias, token, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new farm');
            farm.id = uuid_1.default.v1();
            farm.productsTotal = 0;
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                farm.code = yield this.getValidCodeInTransaction(queryRunner, farm);
                const result = yield queryRunner.manager.save(farm);
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
                    const targetType = yield queryRunner.manager.findOne(models_1.TargetType, { name: 'farm' });
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
                // sync farm ID amd user ID in Identity Service
                const identResponse = yield axios_1.default.create({ baseURL: env_1.env.farmhub.identityService })({
                    url: '/farm',
                    headers: { 'Token-ID': token },
                    method: 'POST',
                    data: { farmId: farm.id, userId: farm.userID },
                });
                const isVerifiedPhoneNumber = identResponse.data.data.isVerifiedPhoneNumber;
                if (isVerifiedPhoneNumber) {
                    yield queryRunner.manager.update(models_1.Farm, farm.id, { isVerifiedPhoneNumber: true });
                    result.isVerifiedPhoneNumber = true;
                }
                yield queryRunner.commitTransaction();
                return result;
            }
            catch (err) {
                yield queryRunner.rollbackTransaction();
                if (err.response) {
                    this.log.error(`[Identity Service response] ${err.response.status} ${err.response.data.message}`);
                    throw new routing_controllers_1.HttpError(500, err.response.data.message + ' at IdentityService');
                }
                else {
                    throw err;
                }
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    findOne(id, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find one farm');
            return this.dbHelper.findOne(this.farmRepository, id, option);
        });
    }
    findOneDashboard(id, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find one farm dash board');
            const result = yield Promise.all([
                this.areaRepository.count({ where: { farmID: id } }),
                this.dbHelper.count(this.productObjectRepository, { where: { product: { farmID: id } } }),
                this.dbHelper.count(this.sectionRepository, { where: { process: { farmID: id } } }),
            ]);
            return {
                id,
                areasTotal: result[0],
                productObjectsTotal: result[1],
                sectionsTotal: result[2],
            };
        });
    }
    update(id, farm, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a farm');
            delete farm.productsTotal;
            yield this.farmRepository.update(id, farm);
            return this.farmRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a farm');
            const item = yield this.farmRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.farmRepository.delete(id);
            return item;
        });
    }
    getProducts(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Get products of farm');
            const [items, count] = yield this.categoryRepository.findAndCount({
                select: option.select,
                where: Object.assign({ farmID: id }, option.where),
                relations: option.relations,
                skip: option.skip,
                take: option.take,
                order: option.order,
            });
            return {
                list: items,
                count,
            };
        });
    }
    getAreas(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Get areas of farm');
            const [items, count] = yield this.areaRepository.findAndCount({
                select: option.select,
                where: Object.assign({ farmID: id }, option.where),
                relations: option.relations,
                skip: option.skip,
                take: option.take,
                order: option.order,
            });
            return {
                list: items,
                count,
            };
        });
    }
    getProductObjects(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Get product objects of farm');
            const [items, count] = yield this.productObjectRepository.findAndCount({
                select: option.select,
                where: Object.assign({ farmID: id }, option.where),
                relations: option.relations,
                skip: option.skip,
                take: option.take,
                order: option.order,
            });
            return {
                list: items,
                count,
            };
        });
    }
    getProcesses(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Get processes of farm');
            const [items, count] = yield this.processRepository.findAndCount({
                select: option.select,
                where: Object.assign({ farmID: id }, option.where),
                relations: option.relations,
                skip: option.skip,
                take: option.take,
                order: option.order,
            });
            return {
                list: items,
                count,
            };
        });
    }
};
FarmService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(5, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(6, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(8, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FarmRepository,
        repositories_1.ProductRepository,
        repositories_1.AreaRepository,
        repositories_1.ProductObjectRepository,
        repositories_1.ProcessRepository,
        repositories_1.SectionRepository,
        repositories_1.LocationRepository,
        DbHelper_1.DbHelper, Object])
], FarmService);
exports.FarmService = FarmService;
//# sourceMappingURL=FarmService.js.map