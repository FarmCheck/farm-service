import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { FarmPaymentRepository } from '../../repositories';
import { FarmPayment } from '../../models';
import { CListData, ICrudOption } from '../index';

@Entity()
export class FarmPaymentService {
    constructor(
        @OrmRepository()
        private farmPaymentRepository: FarmPaymentRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<FarmPayment> | undefined> {
        this.log.info('Find all farm payment');
        const list = await this.farmPaymentRepository.findAndCount({
            skip: option.skip,
            take: option.take,
            select: option.select,
            where: option.where,
            relations: option.relations,
            order: option.order,
        });

        return { list: list[0], count: list[1] };
    }

    public create(
        farmPayment: FarmPayment,
        option?: ICrudOption
    ): Promise<FarmPayment> {
        this.log.info('Create a new farm payment');
        farmPayment.id = uuid.v1();
        return this.farmPaymentRepository.save(farmPayment);
    }

    public findOne(id: string, option?: ICrudOption): Promise<FarmPayment> {
        this.log.info('Find one farm payment');
        return this.farmPaymentRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        farmPayment: object,
        option?: ICrudOption
    ): Promise<FarmPayment | undefined> {
        this.log.info('Update some fields a farm payment');
        await this.farmPaymentRepository.update(id, farmPayment);
        return this.farmPaymentRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<FarmPayment | undefined> {
        this.log.info('Delete a farm payment');
        const item = await this.farmPaymentRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.farmPaymentRepository.delete(id);

        return item;
    }
}
