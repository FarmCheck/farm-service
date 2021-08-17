import { Entity, FindOneOptions, getConnection, Like, QueryRunner } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { AreaRepository, LocationRepository } from '../../repositories';
import { Area, Media, MediaAble, TargetType } from '../../models';
import { CListData, ICrudOption } from '../base';
import { DbHelper } from '../common';
import { HttpError } from 'routing-controllers';
import { Helper } from '../../../common';

@Entity()
export class AreaService {
    constructor(
        @OrmRepository()
        private areaRepository: AreaRepository,
        @OrmRepository()
        private locationRepository: LocationRepository,
        private dbHelper: DbHelper,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async getValidCodeInTransaction(
        queryRunner: QueryRunner,
        area: Area
    ): Promise<string> {
        const location = await this.locationRepository.findOne(area.locationID);

        if (!location) {
            throw new HttpError(400, 'locationID is invalid');
        }

        const [provinceCode, nameCode] = await Promise.all([
            Helper.combineFirstCharacterAndLastWord(location.province),
            Helper.combineFirstCharacterAndLastWord(area.name),
        ]);
        const prefixCode = `${provinceCode}-${nameCode}`;
        const findOneOptions: FindOneOptions<Area> = {
            where: { code: Like(`${prefixCode}%`) },
            order: { createdAt: 'DESC' },
            select: ['code'],
        };

        return this.dbHelper.getValidCodeInTransaction(queryRunner, Area, findOneOptions, prefixCode, 4);
    }

    public async find(
        option: ICrudOption = {}
    ): Promise<CListData<Area> | undefined> {
        this.log.info('Find all area');
        return this.dbHelper.findAndCount(this.areaRepository, option);
    }

    public async create(area: Area, medias: any[], option: ICrudOption = {}): Promise<Area> {
        this.log.info('Create a new area');
        area.id = uuid.v1();
        area.productObjectsTotal = 0;
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            area.code = area.code ?? await this.getValidCodeInTransaction(queryRunner, area);
            const result = await queryRunner.manager.save(area);

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
                const targetType = await queryRunner.manager.findOne(TargetType, { name: 'area'});
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

            await queryRunner.commitTransaction();

            return result;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    public async findOne(id: string, option: ICrudOption = {}): Promise<Area> {
        this.log.info('Find one area');

        const result =  await this.dbHelper.findOne(this.areaRepository, id, option);

        if (!result) {
            return result;
        }

        return result;
    }

    public async update(
        id: string,
        area: Area,
        option?: ICrudOption
    ): Promise<Area | undefined> {
        this.log.info('Update some fields a area');
        delete area.productObjectsTotal;
        await this.areaRepository.update(id, area);
        return this.areaRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Area | undefined> {
        this.log.info('Delete a area');
        const item = await this.areaRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.areaRepository.delete(id);

        return item;
    }
}
