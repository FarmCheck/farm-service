import { HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { Entity, FindOneOptions, getConnection, Like, QueryRunner } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';
import { Helper } from '../../../common';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import { ProductRepository, SubCategoryRepository } from '../../repositories';
import { Farm, Media, MediaAble, Product, TargetType } from '../../models';
import { CListData, ICrudOption } from '../base';
import { DbHelper } from '../common';

@Entity()
@Service()
export class ProductService {
    constructor(
        @OrmRepository()
        private productRepository: ProductRepository,
        @OrmRepository()
        private subCategoryRepository: SubCategoryRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option: ICrudOption = {}
    ): Promise<CListData<Product> | undefined> {
        this.log.info('Find all product');

        return await this.dbHelper.findAndCount(this.productRepository, option);
    }

    public async getValidCodeInTransaction(
        queryRunner: QueryRunner,
        product: Product
    ): Promise<string> {
        const subCategory = await this.subCategoryRepository.findOne(product.subCategoryID);

        if (!subCategory) {
            throw new HttpError(400, 'subCategoryID is invalid');
        }

        const nameCode = await Helper.combineFirstCharacterAndLastWord(product.name);
        const prefixCode = `${subCategory.code}-${nameCode}`;
        const findOneOptions: FindOneOptions<Product> = {
            where: { code: Like(`${prefixCode}%`) },
            order: { createdAt: 'DESC' },
            select: ['code'],
        };

        return this.dbHelper.getValidCodeInTransaction(queryRunner, Product, findOneOptions, prefixCode, 4);
    }

    public async create(product: Product, medias: any[], option: ICrudOption = {}): Promise<Product> {
        this.log.info('Create a new product');
        product.id = uuid.v1();
        product.productObjectsTotal = 0;
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            product.code = product.code ?? await this.getValidCodeInTransaction(queryRunner, product);
            const result = await queryRunner.manager.save(product);

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
                const targetType = await queryRunner.manager.findOne(TargetType, { name: 'product'});
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

            await this.changeProductsTotal(queryRunner, result, 1);

            await queryRunner.commitTransaction();

            return result;
        } catch (err: any) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    public async findOne(id: string, option: ICrudOption = {}): Promise<Product> {
        this.log.info('Find one product');

        return this.dbHelper.findOne(this.productRepository, id, option);
    }

    public async update(
        id: string,
        product: Product,
        option?: ICrudOption
    ): Promise<Product | undefined> {
        this.log.info('Update some fields a product');
        delete product.productObjectsTotal;
        await this.productRepository.update(id, product);
        return this.productRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Product | undefined> {
        this.log.info('Delete a product');
        const item = await this.productRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            await queryRunner.manager.softDelete(Product, item.id);
            await this.changeProductsTotal(queryRunner, item, -1);
            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw e;
        } finally {
            await queryRunner.release();
        }

        return item;
    }

    private async changeProductsTotal(
        queryRunner: QueryRunner,
        product: Product,
        amount: number
    ): Promise<void> {
        const changeField = 'productsTotal';
        await queryRunner.manager.increment(Farm, {
            id: product.farmID,
        }, changeField, amount);
    }
}
