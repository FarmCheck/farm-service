import { Entity, FindOneOptions, getConnection, Like, QueryRunner } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { HttpError } from 'routing-controllers';
import uuid from 'uuid';
import _ from 'lodash';

import { CListData, ICrudOption } from '..';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { Area, Media, MediaAble, Process, Product, ProductObject, Section, TargetType } from '../../models';
import { DiaryRepository, ProductObjectRepository, ProductRepository, SectionRepository, StepRepository } from '../../repositories';
import { DbHelper } from '../common';
import { EnumStatus } from '../../models/Base';
import { DiariesPortalResponse } from '../../controllers/responses/PortalResponse';
import { SectionNotFoundError } from '../../errors';

@Entity()
export class ProductObjectService {
    constructor(
        @OrmRepository()
        private productObjectRepository: ProductObjectRepository,
        @OrmRepository()
        private sectionRepository: SectionRepository,
        @OrmRepository()
        private diaryRepository: DiaryRepository,
        @OrmRepository()
        private stepRepository: StepRepository,
        @OrmRepository()
        private productRepository: ProductRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option: ICrudOption = {}
    ): Promise<CListData<ProductObject> | undefined> {
        this.log.info('Find all product object');

        return await this.dbHelper.findAndCount(this.productObjectRepository, option);
    }

    public async getValidCodeInTransaction(
        queryRunner: QueryRunner,
        productObject: ProductObject
    ): Promise<string> {
        const product = await this.productRepository.findOne(productObject.productID);

        if (!product) {
            throw new HttpError(400, 'productID is invalid');
        }

        const prefixCode = product.code;
        const findOneOptions: FindOneOptions<ProductObject> = {
            where: { code: Like(`${prefixCode}%`) },
            order: { createdAt: 'DESC' },
            select: ['code'],
        };

        return this.dbHelper.getValidCodeInTransaction(queryRunner, ProductObject, findOneOptions, prefixCode, 5);
    }

    public async create(
        productObject: ProductObject,
        medias: any[],
        option: ICrudOption = {}): Promise<ProductObject> {
        this.log.info('Create a new product object');
        productObject.id = uuid.v1();
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            productObject.code = productObject.code ?? await this.getValidCodeInTransaction(queryRunner, productObject);
            const savedProductObject = await queryRunner.manager.save(productObject);

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
                const targetType = await queryRunner.manager.findOne(TargetType, { name: 'product_object'});
                awaiter = [];

                for (const mediaEntity of mediaEntities) {
                    const mediaAble = new MediaAble();
                    mediaAble.id = uuid.v1();
                    mediaAble.targetID = savedProductObject.id;
                    mediaAble.targetTypeID = targetType.id;
                    mediaAble.mediaID = mediaEntity.id;
                    awaiter.push(queryRunner.manager.save(mediaAble));
                }

                await Promise.all(awaiter);
            }
            await this.changeProductObjectsTotal(queryRunner, savedProductObject, +1);

            await queryRunner.commitTransaction();

            return savedProductObject;
        } catch (err: any) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    public async findOne(id: string, option: ICrudOption = {}): Promise<ProductObject> {
        this.log.info('Find one product object');

        if (option.relations && option.relations.includes('medias')) {
            const index = option.relations.indexOf('medias');
            option.relations[index] = 'mediaAbles';
            option.relations.push('mediaAbles.media');
        }

        const productObject = await this.productObjectRepository.findOne(id, option);

        if (productObject.mediaAbles) {
            const medias = [];
            for (const mediaAble of productObject.mediaAbles) {
                medias.push({
                    id: mediaAble.media.id,
                    type: mediaAble.media.type,
                    url: mediaAble.media.url,
                    urlThumbnail: mediaAble.media.urlThumbnail,
                    createdAt: mediaAble.media.createdAt,
                });
            }
            _.assign(productObject, { medias });
        }

        return productObject;

    }

    public async findStepsWithDiaries(
        productObjectID: string
    ): Promise<DiariesPortalResponse | undefined> {
        this.log.info('Find steps with diaries for portal by productObject');
        const currentActiveSection = await this.sectionRepository
            .findOne({
                where: {
                    productObjectID,
                    status: EnumStatus.ACTIVATE,
                },
                relations: ['process'],
                order: {
                    createdAt: 'DESC',
                },
                cache: true,
            });
        if (!currentActiveSection) {
            throw new SectionNotFoundError();
        }

        const steps = await this.stepRepository
            .createQueryBuilder('step')
            .innerJoin(
                'step.diaries',
                'd',
                'd.stepID = step.id AND d.sectionID = :sectionID',
                { sectionID: currentActiveSection.id }
            )
            .where('step.processID = :processID', { processID: currentActiveSection.processID })
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
        await Promise.all(steps.map(async (step, idx) => {
             const diaries = await this.diaryRepository
                .createQueryBuilder('d')
                .where('d.stepID = :stepID', { stepID: step.id })
                .andWhere('d.sectionID = :sectionID', { sectionID: currentActiveSection.id })
                .leftJoinAndSelect('d.hash', 'hash')
                .orderBy('d.createdAt', 'DESC')
                .cache(10 * 1000)
                .take(1)
                .getMany();
            steps[idx].diaries = diaries;
        }));

        return new DiariesPortalResponse({
            process: currentActiveSection.process,
            steps,
            section: currentActiveSection,
        });
    }

    public async update(
        id: string,
        productObject: object,
        option?: ICrudOption
    ): Promise<ProductObject | undefined> {
        this.log.info('Update some fields a product object');
        await this.productObjectRepository.update(id, productObject);
        return this.productObjectRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<ProductObject | undefined> {
        this.log.info('Delete a product object');
        const item = await this.productObjectRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            await queryRunner.manager.softDelete(ProductObject, item.id);
            await this.changeProductObjectsTotal(queryRunner, item, -1);
            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }

        return item;
    }

    public async getSections(
        id: string,
        option?: ICrudOption
    ): Promise<CListData<Section> | undefined> {
        this.log.info('Get sections of product object');

        const items = await this.sectionRepository.find({
            select: option.select,
            where: {
                productObjectID: id,
                ...option.where,
            },
            relations: option.relations,
            skip: option.skip,
            take: option.take,
            order: option.order,
        });

        return {
            list: items,
            count: items.length,
        };
    }

    private async changeProductObjectsTotal(
        queryRunner: QueryRunner,
        productObject: ProductObject,
        amount: number
    ): Promise<void> {
        // region Update count on relate table
        const incrementField = 'productObjectsTotal';
        await queryRunner.manager.increment(Area, { id: productObject.areaID }, incrementField, amount);
        await queryRunner.manager.increment(Product, { id: productObject.productID }, incrementField, amount);
        await queryRunner.manager.increment(Process, { id: productObject.processID }, incrementField, amount);
        // endregion
    }
}
