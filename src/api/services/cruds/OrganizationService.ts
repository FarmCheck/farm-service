import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { OrganizationRepository } from '../../repositories';
import { Organization } from '../../models';
import { CListData, ICrudOption } from '../index';

@Entity()
export class OrganizationService {
    constructor(
        @OrmRepository()
        private organizationRepository: OrganizationRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<Organization> | undefined> {
        this.log.info('Find all organization');
        const list = await this.organizationRepository.findAndCount({
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
        organization: Organization,
        option?: ICrudOption
    ): Promise<Organization> {
        this.log.info('Create a new organization');
        organization.id = uuid.v1();
        return this.organizationRepository.save(organization);
    }

    public findOne(id: string, option?: ICrudOption): Promise<Organization> {
        this.log.info('Find one organization');
        return this.organizationRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        organization: object,
        option?: ICrudOption
    ): Promise<Organization | undefined> {
        this.log.info('Update some fields a organization');
        await this.organizationRepository.update(id, organization);
        return this.organizationRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Organization | undefined> {
        this.log.info('Delete a organization');
        const item = await this.organizationRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.organizationRepository.delete(id);

        return item;
    }
}
