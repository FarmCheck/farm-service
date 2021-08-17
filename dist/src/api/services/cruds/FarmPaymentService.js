"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmPaymentService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
let FarmPaymentService = class FarmPaymentService {
    constructor(farmPaymentRepository, log) {
        this.farmPaymentRepository = farmPaymentRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all farm payment');
            const list = yield this.farmPaymentRepository.findAndCount({
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
    create(farmPayment, option) {
        this.log.info('Create a new farm payment');
        farmPayment.id = uuid_1.default.v1();
        return this.farmPaymentRepository.save(farmPayment);
    }
    findOne(id, option) {
        this.log.info('Find one farm payment');
        return this.farmPaymentRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, farmPayment, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a farm payment');
            yield this.farmPaymentRepository.update(id, farmPayment);
            return this.farmPaymentRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a farm payment');
            const item = yield this.farmPaymentRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.farmPaymentRepository.delete(id);
            return item;
        });
    }
};
FarmPaymentService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FarmPaymentRepository, Object])
], FarmPaymentService);
exports.FarmPaymentService = FarmPaymentService;
//# sourceMappingURL=FarmPaymentService.js.map