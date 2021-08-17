import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { EmployeeRepository } from '../../repositories';
import { Employee } from '../../models';
import { CListData, ICrudOption } from '../index';
import { DbHelper } from '../common';
import { Helper } from '../../../common';

@Entity()
export class EmployeeService {
    constructor(
        @OrmRepository()
        private employeeRepository: EmployeeRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<Employee> | undefined> {
        this.log.info('Find all employee');
        return this.dbHelper.findAndCount(this.employeeRepository, option);
    }

    public async getValidCodeInTransaction(
        employee: Employee
    ): Promise<string> {
        return Helper.combineFirstCharacterAndLastWord(employee.name);
    }

    public async create(
        employee: Employee,
        option?: ICrudOption
    ): Promise<Employee> {
        this.log.info('Create a new employee');
        employee.id = uuid.v1();
        employee.code = employee.code ?? await this.getValidCodeInTransaction(employee);

        return this.employeeRepository.save(employee);
    }

    public findOne(
        id: string,
        option?: ICrudOption
    ): Promise<Employee> {
        this.log.info('Find one employee');
        return this.employeeRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        employee: object,
        option?: ICrudOption
    ): Promise<Employee | undefined> {
        this.log.info('Update some fields a employee');
        await this.employeeRepository.update(
            id,
            employee
        );
        return this.employeeRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Employee | undefined> {
        this.log.info('Delete a employee');
        const item = await this.employeeRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.employeeRepository.delete(id);

        return item;
    }
}
