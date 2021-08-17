"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductObjectService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const routing_controllers_1 = require("routing-controllers");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const Logger_1 = require("../../../decorators/Logger");
const models_1 = require("../../models");
const repositories_1 = require("../../repositories");
const common_1 = require("../common");
const Base_1 = require("../../models/Base");
const PortalResponse_1 = require("../../controllers/responses/PortalResponse");
const errors_1 = require("../../errors");
let ProductObjectService = class ProductObjectService {
    constructor(productObjectRepository, sectionRepository, diaryRepository, stepRepository, productRepository, dbHelper, log) {
        this.productObjectRepository = productObjectRepository;
        this.sectionRepository = sectionRepository;
        this.diaryRepository = diaryRepository;
        this.stepRepository = stepRepository;
        this.productRepository = productRepository;
        this.dbHelper = dbHelper;
        this.log = log;
    }
    find(option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all product object');
            return yield this.dbHelper.findAndCount(this.productObjectRepository, option);
        });
    }
    getValidCodeInTransaction(queryRunner, productObject) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOne(productObject.productID);
            if (!product) {
                throw new routing_controllers_1.HttpError(400, 'productID is invalid');
            }
            const prefixCode = product.code;
            const findOneOptions = {
                where: { code: typeorm_1.Like(`${prefixCode}%`) },
                order: { createdAt: 'DESC' },
                select: ['code'],
            };
            return this.dbHelper.getValidCodeInTransaction(queryRunner, models_1.ProductObject, findOneOptions, prefixCode, 5);
        });
    }
    create(productObject, medias, option = {}) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new product object');
            productObject.id = uuid_1.default.v1();
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                productObject.code = (_a = productObject.code) !== null && _a !== void 0 ? _a : yield this.getValidCodeInTransaction(queryRunner, productObject);
                const savedProductObject = yield queryRunner.manager.save(productObject);
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
                    const targetType = yield queryRunner.manager.findOne(models_1.TargetType, { name: 'product_object' });
                    awaiter = [];
                    for (const mediaEntity of mediaEntities) {
                        const mediaAble = new models_1.MediaAble();
                        mediaAble.id = uuid_1.default.v1();
                        mediaAble.targetID = savedProductObject.id;
                        mediaAble.targetTypeID = targetType.id;
                        mediaAble.mediaID = mediaEntity.id;
                        awaiter.push(queryRunner.manager.save(mediaAble));
                    }
                    yield Promise.all(awaiter);
                }
                yield this.changeProductObjectsTotal(queryRunner, savedProductObject, +1);
                yield queryRunner.commitTransaction();
                return savedProductObject;
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
            this.log.info('Find one product object');
            if (option.relations && option.relations.includes('medias')) {
                const index = option.relations.indexOf('medias');
                option.relations[index] = 'mediaAbles';
                option.relations.push('mediaAbles.media');
            }
            const productObject = yield this.productObjectRepository.findOne(id, option);
            if (productObject.mediaAbles) {
                const medias = [];
                for (const mediaAble of productObject.mediaAbles) {
                    medias.push({
                        id: mediaAble.media.id,
                        type: mediaAble.media.type,
                        url: mediaAble.media.url,
                        urlThumbnail: mediaAble.media.urlThumbnail,
                        createdAt: mediaAble.media.createdAt,
                    });
                }
                lodash_1.default.assign(productObject, { medias });
            }
            return productObject;
        });
    }
    findStepsWithDiaries(productObjectID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find steps with diaries for portal by productObject');
            const currentActiveSection = yield this.sectionRepository
                .findOne({
                where: {
                    productObjectID,
                    status: Base_1.EnumStatus.ACTIVATE,
                },
                relations: ['process'],
                order: {
                    createdAt: 'DESC',
                },
                cache: true,
            });
            if (!currentActiveSection) {
                throw new errors_1.SectionNotFoundError();
            }
            const steps = yield this.stepRepository
                .createQueryBuilder('step')
                .innerJoin('step.diaries', 'd', 'd.stepID = step.id AND d.sectionID = :sectionID', { sectionID: currentActiveSection.id })
                .where('step.processID = :processID', { processID: currentActiveSection.processID })
                .distinct(true)
                .cache(10 * 1000)
                .orderBy('step.order', 'ASC')
                .getMany();
            /**
             * TODO: optimize this
             * N + 1 problem
             * there will be 5-10 steps each process, so will be 10 + 1 select query
             * select each step seem faster and less complex than joining table with `diary`
             */
            yield Promise.all(steps.map((step, idx) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const diaries = yield this.diaryRepository
                    .createQueryBuilder('d')
                    .where('d.stepID = :stepID', { stepID: step.id })
                    .andWhere('d.sectionID = :sectionID', { sectionID: currentActiveSection.id })
                    .leftJoinAndSelect('d.hash', 'hash')
                    .orderBy('d.createdAt', 'DESC')
                    .cache(10 * 1000)
                    .take(1)
                    .getMany();
                steps[idx].diaries = diaries;
            })));
            return new PortalResponse_1.DiariesPortalResponse({
                process: currentActiveSection.process,
                steps,
                section: currentActiveSection,
            });
        });
    }
    update(id, productObject, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a product object');
            yield this.productObjectRepository.update(id, productObject);
            return this.productObjectRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product object');
            const item = yield this.productObjectRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                yield queryRunner.manager.softDelete(models_1.ProductObject, item.id);
                yield this.changeProductObjectsTotal(queryRunner, item, -1);
                yield queryRunner.commitTransaction();
            }
            catch (e) {
                yield queryRunner.rollbackTransaction();
                throw e;
            }
            finally {
                yield queryRunner.release();
            }
            return item;
        });
    }
    getSections(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Get sections of product object');
            const items = yield this.sectionRepository.find({
                select: option.select,
                where: Object.assign({ productObjectID: id }, option.where),
                relations: option.relations,
                skip: option.skip,
                take: option.take,
                order: option.order,
            });
            return {
                list: items,
                count: items.length,
            };
        });
    }
    changeProductObjectsTotal(queryRunner, productObject, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // region Update count on relate table
            const incrementField = 'productObjectsTotal';
            yield queryRunner.manager.increment(models_1.Area, { id: productObject.areaID }, incrementField, amount);
            yield queryRunner.manager.increment(models_1.Product, { id: productObject.productID }, incrementField, amount);
            yield queryRunner.manager.increment(models_1.Process, { id: productObject.processID }, incrementField, amount);
            // endregion
        });
    }
};
ProductObjectService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(4, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(6, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProductObjectRepository,
        repositories_1.SectionRepository,
        repositories_1.DiaryRepository,
        repositories_1.StepRepository,
        repositories_1.ProductRepository,
        common_1.DbHelper, Object])
], ProductObjectService);
exports.ProductObjectService = ProductObjectService;
//# sourceMappingURL=ProductObjectService.js.map