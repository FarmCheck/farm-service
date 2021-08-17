import { Entity, FindOneOptions, getConnection, Like, QueryRunner } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import axios from 'axios';
import _ from 'lodash';
import uuid from 'uuid';
import { HttpError } from 'routing-controllers';
import { FarmDashBoardResponse } from '../../controllers/responses';

import { Logger, LoggerInterface } from '../../../decorators/Logger';
import {
    AreaRepository,
    ProductRepository,
    FarmRepository,
    ProcessRepository,
    ProductObjectRepository,
    LocationRepository, SectionRepository
} from '../../repositories';
import {
    Area, Product, Farm, ProductObject, Process, Media, TargetType, MediaAble,
    // MediaAble
} from '../../models';
import { CListData, ICrudOption } from '../index';
import { DbHelper } from '../common/DbHelper';
import { env } from '../../../env';
import { Helper } from '../../../common';

@Entity()
export class FarmService {
    constructor(
        @OrmRepository()
        private farmRepository: FarmRepository,
        @OrmRepository()
        private categoryRepository: ProductRepository,
        @OrmRepository()
        private areaRepository: AreaRepository,
        @OrmRepository()
        private productObjectRepository: ProductObjectRepository,
        @OrmRepository()
        private processRepository: ProcessRepository,
        @OrmRepository()
        private sectionRepository: SectionRepository,
        @OrmRepository()
        private locationRepository: LocationRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option: ICrudOption = {}
    ): Promise<CListData<Farm> | undefined> {
        this.log.info('Find all farm');
        return this.dbHelper.findAndCount(this.farmRepository, option);
    }

    public async getValidCodeInTransaction(
        queryRunner: QueryRunner,
        farm: Farm
    ): Promise<string> {
        const location = await this.locationRepository.findOne(farm.locationID);

        if (!location) {
            throw new HttpError(400, 'locationID is invalid');
        }

        const [provinceCode, nameCode] = await Promise.all([
            Helper.combineFirstCharacterAndLastWord(location.province),
            Helper.combineFirstCharacterAndLastWord(farm.name),
        ]);
        const prefixCode = `${provinceCode}-${nameCode}`;
        const findOneOptions: FindOneOptions<Farm> = {
            where: { code: Like(`${prefixCode}%`) },
            order: { createdAt: 'DESC' },
            select: ['code'],
        };

        return this.dbHelper.getValidCodeInTransaction(queryRunner, Farm, findOneOptions, prefixCode, 4);
    }

    public async create(
        farm: Farm,
        medias: any[],
        token: string,
        option: ICrudOption = {}): Promise<Farm> {
        this.log.info('Create a new farm');
        farm.id = uuid.v1();
        farm.productsTotal = 0;
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            farm.code = await this.getValidCodeInTransaction(queryRunner, farm);
            const result = await queryRunner.manager.save(farm);

            if (medias && medias.length !== 0) {
                let awaiter = [];

                // 0: image, 1: video, 2: document
                for (const media of medias) {
                    const mediaEntity = new Media();
                    mediaEntity.id = uuid.v1();
                    mediaEntity.type = media.type;
                    mediaEntity.url = media.url;
                    mediaEntity.urlThumbnail = media.urlThumbnail;
                    awaiter.push(queryRunner.manager.save(mediaEntity));
                }

                const mediaEntities = await Promise.all(awaiter);
                const targetType = await queryRunner.manager.findOne(TargetType, { name: 'farm'});
                awaiter = [];

                for (const mediaEntity of mediaEntities) {
                    const mediaAble = new MediaAble();
                    mediaAble.id = uuid.v1();
                    mediaAble.targetID = result.id;
                    mediaAble.targetTypeID = targetType.id;
                    mediaAble.mediaID = mediaEntity.id;
                    awaiter.push(queryRunner.manager.save(mediaAble));
                }

                await Promise.all(awaiter);
            }

            // sync farm ID amd user ID in Identity Service
            const identResponse = await axios.create({baseURL: env.farmhub.identityService})({
                url: '/farm',
                headers: {'Token-ID': token},
                method: 'POST',
                data: {farmId: farm.id, userId: farm.userID},
            });

            const isVerifiedPhoneNumber = identResponse.data.data.isVerifiedPhoneNumber as boolean;

            if (isVerifiedPhoneNumber) {
                await queryRunner.manager.update(Farm, farm.id, { isVerifiedPhoneNumber: true });
                result.isVerifiedPhoneNumber = true;
            }

            await queryRunner.commitTransaction();

            return result;
        } catch (err: any) {
            await queryRunner.rollbackTransaction();

            if (err.response) {
                this.log.error(`[Identity Service response] ${err.response.status} ${err.response.data.message}`);
                throw new HttpError(500, err.response.data.message + ' at IdentityService');
            } else {
                throw err;
            }
        } finally {
            await queryRunner.release();
        }
    }

    public async findOne(id: string, option: ICrudOption = {}): Promise<Farm | undefined> {
        this.log.info('Find one farm');
        return this.dbHelper.findOne(this.farmRepository, id, option);
    }

    public async findOneDashboard(id: string, option: ICrudOption = {}): Promise<FarmDashBoardResponse | undefined> {
        this.log.info('Find one farm dash board');

        const result = await Promise.all([
            this.areaRepository.count({where: { farmID: id}}),
            this.dbHelper.count(this.productObjectRepository, {where: {product: { farmID: id}}}),
            this.dbHelper.count(this.sectionRepository, {where: {process: {farmID: id}}}),
        ]);

        return {
            id,
            areasTotal: result[0],
            productObjectsTotal: result[1],
            sectionsTotal: result[2],
        };
    }

    public async update(
        id: string,
        farm: Farm,
        option?: ICrudOption
    ): Promise<Farm | undefined> {
        this.log.info('Update some fields a farm');
        delete farm.productsTotal;
        await this.farmRepository.update(id, farm);
        return this.farmRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Farm | undefined> {
        this.log.info('Delete a farm');
        const item = await this.farmRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.farmRepository.delete(id);

        return item;
    }

    public async getProducts(
        id: string,
        option?: ICrudOption
    ): Promise<CListData<Product> | undefined> {
        this.log.info('Get products of farm');

        const [items, count] = await this.categoryRepository.findAndCount({
            select: option.select,
            where: {
                farmID: id,
                ...option.where,
            },
            relations: option.relations,
            skip: option.skip,
            take: option.take,
            order: option.order,
        });

        return {
            list: items,
            count,
        };
    }

    public async getAreas(
        id: string,
        option?: ICrudOption
    ): Promise<CListData<Area> | undefined> {
        this.log.info('Get areas of farm');

        const [items, count] = await this.areaRepository.findAndCount({
            select: option.select,
            where: {
                farmID: id,
                ...option.where,
            },
            relations: option.relations,
            skip: option.skip,
            take: option.take,
            order: option.order,
        });

        return {
            list: items,
            count,
        };
    }

    public async getProductObjects(
        id: string,
        option?: ICrudOption
    ): Promise<CListData<ProductObject> | undefined> {
        this.log.info('Get product objects of farm');

        const [items, count] = await this.productObjectRepository.findAndCount({
            select: option.select,
            where: {
                farmID: id,
                ...option.where,
            },
            relations: option.relations,
            skip: option.skip,
            take: option.take,
            order: option.order,
        });

        return {
            list: items,
            count,
        };
    }

    public async getProcesses(
        id: string,
        option?: ICrudOption
    ): Promise<CListData<Process> | undefined> {
        this.log.info('Get processes of farm');

        const [items, count] = await this.processRepository.findAndCount({
            select: option.select,
            where: {
                farmID: id,
                ...option.where,
            },
            relations: option.relations,
            skip: option.skip,
            take: option.take,
            order: option.order,
        });

        return {
            list: items,
            count,
        };
    }
}
