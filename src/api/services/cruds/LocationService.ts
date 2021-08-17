import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { LocationRepository } from '../../repositories';
import { Location } from '../../models';
import { CListData, ICrudOption } from '../index';

@Entity()
export class LocationService {
    constructor(
        @OrmRepository()
        private locationRepository: LocationRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<Location> | undefined> {
        this.log.info('Find all location');
        const list = await this.locationRepository.findAndCount({
            skip: option.skip,
            take: option.take,
            select: option.select,
            where: option.where,
            relations: option.relations,
            order: option.order,
        });

        return { list: list[0], count: list[1] };
    }

    public create(location: Location, option?: ICrudOption): Promise<Location> {
        this.log.info('Create a new location');
        location.id = uuid.v1();
        return this.locationRepository.save(location);
    }

    public findOne(id: string, option?: ICrudOption): Promise<Location> {
        this.log.info('Find one location');
        return this.locationRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        location: object,
        option?: ICrudOption
    ): Promise<Location | undefined> {
        this.log.info('Update some fields a location');
        await this.locationRepository.update(id, location);
        return this.locationRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Location | undefined> {
        this.log.info('Delete a location');
        const item = await this.locationRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.locationRepository.delete(id);

        return item;
    }
}
