import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { MediaAbleRepository } from '../../repositories';
import { MediaAble } from '../../models';
import { CListData, ICrudOption } from '../index';

@Entity()
export class MediaAbleService {
    constructor(
        @OrmRepository()
        private mediaAbleRepository: MediaAbleRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<MediaAble> | undefined> {
        this.log.info('Find all media able');
        const list = await this.mediaAbleRepository.findAndCount({
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
        mediaAble: MediaAble,
        option?: ICrudOption
    ): Promise<MediaAble> {
        this.log.info('Create a new media able');
        mediaAble.id = uuid.v1();
        return this.mediaAbleRepository.save(mediaAble);
    }

    public findOne(id: string, option?: ICrudOption): Promise<MediaAble> {
        this.log.info('Find one media able');
        return this.mediaAbleRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        mediaAble: object,
        option?: ICrudOption
    ): Promise<MediaAble | undefined> {
        this.log.info('Update some fields a media able');
        await this.mediaAbleRepository.update(id, mediaAble);
        return this.mediaAbleRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<MediaAble | undefined> {
        this.log.info('Delete a media able');
        const item = await this.mediaAbleRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.mediaAbleRepository.delete(id);

        return item;
    }
}
