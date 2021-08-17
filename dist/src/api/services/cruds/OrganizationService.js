"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
let OrganizationService = class OrganizationService {
    constructor(organizationRepository, log) {
        this.organizationRepository = organizationRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all organization');
            const list = yield this.organizationRepository.findAndCount({
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
    create(organization, option) {
        this.log.info('Create a new organization');
        organization.id = uuid_1.default.v1();
        return this.organizationRepository.save(organization);
    }
    findOne(id, option) {
        this.log.info('Find one organization');
        return this.organizationRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, organization, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a organization');
            yield this.organizationRepository.update(id, organization);
            return this.organizationRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a organization');
            const item = yield this.organizationRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.organizationRepository.delete(id);
            return item;
        });
    }
};
OrganizationService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OrganizationRepository, Object])
], OrganizationService);
exports.OrganizationService = OrganizationService;
//# sourceMappingURL=OrganizationService.js.map