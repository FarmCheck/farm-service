"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const common_1 = require("../common");
let StepService = class StepService {
    constructor(stepRepository, dbHelper, log) {
        this.stepRepository = stepRepository;
        this.dbHelper = dbHelper;
        this.log = log;
    }
    find(option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all step');
            return yield this.dbHelper.findAndCount(this.stepRepository, option);
        });
    }
    create(step, stepProperties, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new step');
            step.id = uuid_1.default.v1();
            step.diariesTotal = 0;
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const result = yield queryRunner.manager.save(step);
                if (stepProperties && stepProperties.length !== 0) {
                    const waiters = [];
                    for (const stepProperty of stepProperties) {
                        const stepPropertyEntity = new models_1.StepProperty();
                        lodash_1.default.assign(stepPropertyEntity, stepProperty);
                        stepPropertyEntity.id = uuid_1.default.v1();
                        stepPropertyEntity.stepID = result.id;
                        waiters.push(queryRunner.manager.save(stepPropertyEntity));
                    }
                    yield Promise.all(waiters);
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
    findOne(id, option) {
        this.log.info('Find one step');
        return this.stepRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, step, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a step');
            yield this.stepRepository.update(id, step);
            return this.stepRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a step');
            const item = yield this.stepRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.stepRepository.delete(id);
            return item;
        });
    }
};
StepService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.StepRepository,
        common_1.DbHelper, Object])
], StepService);
exports.StepService = StepService;
//# sourceMappingURL=StepService.js.map