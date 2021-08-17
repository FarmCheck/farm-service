"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
let LocationService = class LocationService {
    constructor(locationRepository, log) {
        this.locationRepository = locationRepository;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all location');
            const list = yield this.locationRepository.findAndCount({
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
    create(location, option) {
        this.log.info('Create a new location');
        location.id = uuid_1.default.v1();
        return this.locationRepository.save(location);
    }
    findOne(id, option) {
        this.log.info('Find one location');
        return this.locationRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, location, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a location');
            yield this.locationRepository.update(id, location);
            return this.locationRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a location');
            const item = yield this.locationRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.locationRepository.delete(id);
            return item;
        });
    }
};
LocationService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.LocationRepository, Object])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=LocationService.js.map