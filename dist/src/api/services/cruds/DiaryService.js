"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryService = void 0;
const tslib_1 = require("tslib");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const models_1 = require("../../models");
const TendermintService_1 = require("../blockchain/TendermintService");
const DiaryHashPushError_1 = require("../../errors/Diary/DiaryHashPushError");
const typedi_1 = require("typedi");
const common_1 = require("../common");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
let DiaryService = class DiaryService {
    constructor(diaryRepository, sectionRepository, dbHelper, log, pushDiaryService) {
        this.diaryRepository = diaryRepository;
        this.sectionRepository = sectionRepository;
        this.dbHelper = dbHelper;
        this.log = log;
        this.pushDiaryService = pushDiaryService;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all diary');
            return yield this.dbHelper.findAndCount(this.diaryRepository, option);
        });
    }
    create(diary, productObjectID, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new diary');
            diary.id = uuid_1.default.v1();
            if (!diary.sectionID && !productObjectID || diary.sectionID && productObjectID) {
                throw new routing_controllers_1.BadRequestError('Invalid data');
            }
            if (productObjectID) {
                const sections = yield this.sectionRepository.find({ where: { 'productObjectID': productObjectID, 'status': 0 } });
                if (sections.length) {
                    const { id: sectionID } = sections[0];
                    diary.sectionID = sectionID;
                }
                else {
                    throw new routing_controllers_1.BadRequestError('Invalid section data');
                }
            }
            let savedDiary;
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                savedDiary = yield queryRunner.manager.save(diary);
                yield this.changeDiariesTotal(queryRunner, savedDiary, 1);
                yield queryRunner.commitTransaction();
            }
            catch (e) {
                yield queryRunner.rollbackTransaction();
                throw e;
            }
            finally {
                yield queryRunner.release();
            }
            try {
                // TODO: replace any to real user
                return yield this.pushDiaryService.push(savedDiary, {}, 'CREATE');
            }
            catch (error) {
                if (error instanceof DiaryHashPushError_1.DiaryHashPushError) {
                    return savedDiary;
                }
                throw error;
            }
        });
    }
    findOne(id, option) {
        this.log.info('Find one diary');
        return this.diaryRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, diary, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a diary');
            yield this.diaryRepository.update(id, diary);
            const savedDiary = yield this.diaryRepository.findOne(id);
            try {
                // TODO: replace any to real user
                return yield this.pushDiaryService.push(savedDiary, {}, 'UPDATE');
            }
            catch (error) {
                if (error instanceof DiaryHashPushError_1.DiaryHashPushError) {
                    return savedDiary;
                }
                throw error;
            }
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a diary');
            const item = yield this.diaryRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            const queryRunner = typeorm_1.getConnection().createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction('SERIALIZABLE');
            try {
                yield queryRunner.manager.softDelete(models_1.Diary, id);
                yield this.changeDiariesTotal(queryRunner, item, -1);
                return item;
            }
            catch (e) {
                yield queryRunner.rollbackTransaction();
                throw e;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    changeDiariesTotal(queryRunner, entity, amount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const field = `diariesTotal`;
            yield queryRunner.manager.increment(models_1.Step, { id: entity.stepID }, field, amount);
            yield queryRunner.manager.increment(models_1.Section, { id: entity.sectionID }, field, amount);
        });
    }
};
DiaryService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(3, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DiaryRepository,
        repositories_1.SectionRepository,
        common_1.DbHelper, Object, TendermintService_1.TendermintService])
], DiaryService);
exports.DiaryService = DiaryService;
//# sourceMappingURL=DiaryService.js.map