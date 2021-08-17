"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const tslib_1 = require("tslib");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const common_1 = require("../../../common");
const Logger_1 = require("../../../decorators/Logger");
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
const common_2 = require("../common");
let ProductService = class ProductService {
    constructor(productRepository, subCategoryRepository, dbHelper, log) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.dbHelper = dbHelper;
        this.log = log;
    }
    find(option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all product');
            return yield this.dbHelper.findAndCount(this.productRepository, option);
        });
    }
    getValidCodeInTransaction(queryRunner, product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const subCategory = yield this.subCategoryRepository.findOne(product.subCategoryID);
            if (!subCategory) {
                throw new routing_controllers_1.HttpError(400, 'subCategoryID is invalid');
            }
            const nameCode = yield common_1.Helper.combineFirstCharacterAndLastWord(product.name);
            const prefixCode = `${subCategory.code}-${nameCode}`;
            const findOneOptions = {
                where: { code: typeorm_1.Like(`${prefixCode}%`) },
                order: { createdAt: 'DESC' },
                select: ['code'],
            };
            return this.dbHelper.getValidCodeInTransaction(queryRunner, models_1.Product, findOneOptions, prefixCode, 4);
        });
    }
    create(product, medias, option = {}) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new product');
            product.id = uuid_1.default.v1();
            product.productObjectsTotal = 0;
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                product.code = (_a = product.code) !== null && _a !== void 0 ? _a : yield this.getValidCodeInTransaction(queryRunner, product);
                const result = yield queryRunner.manager.save(product);
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
                    const targetType = yield queryRunner.manager.findOne(models_1.TargetType, { name: 'product' });
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
                yield this.changeProductsTotal(queryRunner, result, 1);
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
            this.log.info('Find one product');
            return this.dbHelper.findOne(this.productRepository, id, option);
        });
    }
    update(id, product, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a product');
            delete product.productObjectsTotal;
            yield this.productRepository.update(id, product);
            return this.productRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a product');
            const item = yield this.productRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                yield queryRunner.manager.softDelete(models_1.Product, item.id);
                yield this.changeProductsTotal(queryRunner, item, -1);
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
    changeProductsTotal(queryRunner, product, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const changeField = 'productsTotal';
            yield queryRunner.manager.increment(models_1.Farm, {
                id: product.farmID,
            }, changeField, amount);
        });
    }
};
ProductService = tslib_1.__decorate([
    typeorm_1.Entity(),
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProductRepository,
        repositories_1.SubCategoryRepository,
        common_2.DbHelper, Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map