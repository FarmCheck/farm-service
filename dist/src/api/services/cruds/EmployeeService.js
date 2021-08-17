"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../../decorators/Logger");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const repositories_1 = require("../../repositories");
const common_1 = require("../common");
const common_2 = require("../../../common");
let EmployeeService = class EmployeeService {
    constructor(employeeRepository, dbHelper, log) {
        this.employeeRepository = employeeRepository;
        this.dbHelper = dbHelper;
        this.log = log;
    }
    find(option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Find all employee');
            return this.dbHelper.findAndCount(this.employeeRepository, option);
        });
    }
    getValidCodeInTransaction(employee) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return common_2.Helper.combineFirstCharacterAndLastWord(employee.name);
        });
    }
    create(employee, option) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new employee');
            employee.id = uuid_1.default.v1();
            employee.code = (_a = employee.code) !== null && _a !== void 0 ? _a : yield this.getValidCodeInTransaction(employee);
            return this.employeeRepository.save(employee);
        });
    }
    findOne(id, option) {
        this.log.info('Find one employee');
        return this.employeeRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }
    update(id, employee, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Update some fields a employee');
            yield this.employeeRepository.update(id, employee);
            return this.employeeRepository.findOne(id);
        });
    }
    delete(id, option) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a employee');
            const item = yield this.employeeRepository.findOne(id);
            if (item === undefined) {
                return undefined;
            }
            yield this.employeeRepository.delete(id);
            return item;
        });
    }
};
EmployeeService = tslib_1.__decorate([
    typeorm_1.Entity(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(2, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.EmployeeRepository,
        common_1.DbHelper, Object])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=EmployeeService.js.map