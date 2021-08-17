"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typedi_1 = require("typedi");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const Logger_1 = require("../../../decorators/Logger");
const models_1 = require("../../models");
const TendermintService_1 = require("../blockchain/TendermintService");
const common_1 = require("../../../common");
const common_2 = require("../common");
const PortalResponse_1 = require("../../controllers/responses/PortalResponse");
let SectionService = class SectionService {
    constructor(sectionRepository, diaryRepository, stepRepository, dbHelper, tendermintService, log) {
        this.sectionRepository = sectionRepository;
        this.diaryRepository = diaryRepository;
        this.stepRepository = stepRepository;
        this.dbHelper = dbHelper;
        this.tendermintService = tendermintService;
        this.log = log;
    }
    find(option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all section');
            return yield this.dbHelper.findAndCount(this.sectionRepository, option);
        });
    }
    getValidCodeInTransaction(queryRunner, section) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const prefixCode = yield common_1.Helper.combineFirstCharacterAndLastWord(section.name);
            const findOneOptions = {
                where: { code: typeorm_1.Like(`${prefixCode}%`) },
                order: { createdAt: 'DESC' },
                select: ['code'],
            };
            return this.dbHelper.getValidCodeInTransaction(queryRunner, models_1.Section, findOneOptions, prefixCode, 4);
        });
    }
    create(section, option = {}) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new section');
            section.id = uuid_1.default.v1();
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                section.code = (_a = section.code) !== null && _a !== void 0 ? _a : yield this.getValidCodeInTransaction(queryRunner, section);
                section.diariesTotal = 0;
                const result = yield queryRunner.manager.save(section);
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
            return this.sectionRepository.save(section);
        });
    }
    findOne(id, option = {}) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find one section');
            if (option.relations && option.relations.length !== 0) {
                option.relations.push('area');
                option.relations.push('productObject');
                option.relations.push('process');
            }
            else {
                option.relations = ['area', 'productObject', 'process'];
            }
            const section = yield this.sectionRepository.findOne(id, {
                select: option.select,
                relations: option.relations,
            });
            lodash_1.default.assign(section, {
                areaName: section.area.name,
                productObjectName: section.productObject.name,
                processName: section.process.name,
                typeName: section.type === 0 ? 'season' : 'batch',
            });
            delete section.area;
            delete section.process;
            delete section.productObject;
            return section;
        });
    }
    update(id, section, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a section');
            delete section.diariesTotal;
            yield this.sectionRepository.update(id, section);
            return this.sectionRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a section');
            const item = yield this.sectionRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.sectionRepository.delete(id);
            return item;
        });
    }
    findStepsWithDiaries(sectionID) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find steps with diaries by section');
            const section = yield this.sectionRepository
                .findOne(sectionID, {
                relations: ['process'],
            });
            if (!section) {
                return undefined;
            }
            const steps = yield this.stepRepository
                .createQueryBuilder('step')
                .innerJoin('step.diaries', 'd', 'd.stepID = step.id AND d.sectionID = :sectionID', { sectionID })
                .where('step.processID = :processID', { processID: section.processID })
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
                    .andWhere('d.sectionID = :sectionID', { sectionID })
                    .leftJoinAndSelect('d.hash', 'hash')
                    .orderBy('d.createdAt', 'DESC')
                    .cache(10 * 1000)
                    .take(1)
                    .getMany();
                steps[idx].diaries = diaries;
            })));
            return new PortalResponse_1.DiariesPortalResponse({
                process: section.process,
                steps: steps,
                section,
            });
        });
    }
    recheckDiariesByStep(sectionID, stepID, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const [[list, count], nodesList,] = yield Promise.all([
                this.diaryRepository.findAndCount(Object.assign(Object.assign({}, options), { where: Object.assign(Object.assign({}, options.where || {}), { stepID,
                        sectionID }) })),
                this.tendermintService.queryDiary(['section_id', sectionID], ['step_id', stepID]),
            ]);
            const checkedList = list.map((diary) => {
                const nodeDiaryIdx = nodesList
                    .findIndex(_nodeDiary => _nodeDiary.id === diary.id);
                diary.hash = nodeDiaryIdx > -1
                    ? nodesList[nodeDiaryIdx].hash
                    : undefined;
                return diary;
            });
            return {
                list: checkedList,
                count,
            };
        });
    }
};
SectionService = tslib_1.__decorate([
    typeorm_1.Entity(),
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(5, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SectionRepository,
        repositories_1.DiaryRepository,
        repositories_1.StepRepository,
        common_2.DbHelper,
        TendermintService_1.TendermintService, Object])
], SectionService);
exports.SectionService = SectionService;
//# sourceMappingURL=SectionService.js.map