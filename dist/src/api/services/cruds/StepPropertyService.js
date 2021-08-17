"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepPropertyService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const common_1 = require("../common");
let StepPropertyService = class StepPropertyService {
    constructor(stepPropertyRepository, dbHelper, log) {
        this.stepPropertyRepository = stepPropertyRepository;
        this.dbHelper = dbHelper;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all step property');
            return yield this.dbHelper.findAndCount(this.stepPropertyRepository, option);
        });
    }
    create(stepProperty, option) {
        this.log.info('Create a new step property');
        stepProperty.id = uuid_1.default.v1();
        return this.stepPropertyRepository.save(stepProperty);
    }
    findOne(id, option) {
        this.log.info('Find one step property');
        return this.stepPropertyRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, stepProperty, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a step property');
            yield this.stepPropertyRepository.update(id, stepProperty);
            return this.stepPropertyRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a step property');
            const item = yield this.stepPropertyRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.stepPropertyRepository.delete(id);
            return item;
        });
    }
};
StepPropertyService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.StepPropertyRepository,
        common_1.DbHelper, Object])
], StepPropertyService);
exports.StepPropertyService = StepPropertyService;
//# sourceMappingURL=StepPropertyService.js.map