import { Entity, getConnection } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { MediaRepository } from '../../repositories';
import { Media, MediaAble, TargetType } from '../../models';
import { CListData, ICrudOption } from '../index';

@Entity()
export class MediaService {
    constructor(
        @OrmRepository()
        private mediaRepository: MediaRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<Media> | undefined> {
        this.log.info('Find all media');
        const list = await this.mediaRepository.findAndCount({
            skip: option.skip,
            take: option.take,
            select: option.select,
            where: option.where,
            relations: option.relations,
            order: option.order,
        });

        return { list: list[0], count: list[1] };
    }

    public async create(
        media: Media,
        targetID: string,
        targetType: string,
        option?: ICrudOption
    ): Promise<Media> {
        this.log.info('Create a new media');
        media.id = uuid.v1();
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await queryRunner.manager.save(media);
            const targetTypeEntity = await queryRunner.manager.findOne(TargetType, { name: targetType});
            const mediaAble = new MediaAble();
            mediaAble.id = uuid.v1();
            mediaAble.targetID = targetID;
            mediaAble.targetTypeID = targetTypeEntity.id;
            mediaAble.mediaID = result.id;
            await queryRunner.manager.save(mediaAble);
            await queryRunner.commitTransaction();

            return result;
        } catch (error: any) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    public findOne(id: string, option?: ICrudOption): Promise<Media> {
        this.log.info('Find one media');
        return this.mediaRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        media: object,
        option?: ICrudOption
    ): Promise<Media | undefined> {
        this.log.info('Update some fields a media');
        await this.mediaRepository.update(id, media);
        return this.mediaRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Media | undefined> {
        this.log.info('Delete a media');
        const item = await this.mediaRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.mediaRepository.delete(id);

        return item;
    }
}
