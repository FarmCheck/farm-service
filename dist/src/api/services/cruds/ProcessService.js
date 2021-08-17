"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
const common_1 = require("../../../common");
const common_2 = require("../common");
let ProcessService = class ProcessService {
    constructor(processRepository, dbHelper, log) {
        this.processRepository = processRepository;
        this.dbHelper = dbHelper;
        this.log = log;
    }
    find(option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all process');
            return this.dbHelper.findAndCount(this.processRepository, option);
        });
    }
    getValidCodeInTransaction(queryRunner, process) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const prefixCode = yield common_1.Helper.combineFirstCharacterAndLastWord(process.name);
            const findOneOptions = {
                where: { code: typeorm_1.Like(`${prefixCode}%`) },
                order: { createdAt: 'DESC' },
                select: ['code'],
            };
            return this.dbHelper.getValidCodeInTransaction(queryRunner, models_1.Process, findOneOptions, prefixCode, 4);
        });
    }
    create(process, option = {}) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new process');
            process.id = uuid_1.default.v1();
            process.productObjectsTotal = 0;
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                process.code = (_a = process.code) !== null && _a !== void 0 ? _a : yield this.getValidCodeInTransaction(queryRunner, process);
                const result = yield queryRunner.manager.save(process);
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
            return this.processRepository.save(process);
        });
    }
    findOne(id, option = {}) {
        this.log.info('Find one process');
        // if (option.relations && option.relations.length !== 0) {
        //     option.relations.push('steps');
        //     option.relations.push('steps.stepProperties');
        // } else {
        //     option.relations = ['steps', 'steps.stepProperties'];
        // }
        return this.processRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, process, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a process');
            delete process.productObjectsTotal;
            yield this.processRepository.update(id, process);
            return this.processRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a process');
            const item = yield this.processRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.processRepository.delete(id);
            return item;
        });
    }
};
ProcessService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProcessRepository,
        common_2.DbHelper, Object])
], ProcessService);
exports.ProcessService = ProcessService;
//# sourceMappingURL=ProcessService.js.map