import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { CertificationAbleRepository, TargetTypeRepository } from '../../repositories';
import { CertificationAble } from '../../models';
import { CListData, ICrudOption } from '../index';
import { HttpError } from 'routing-controllers';

@Entity()
export class CertificationAbleService {
    constructor(
        @OrmRepository()
        private certificationAbleRepository: CertificationAbleRepository,
        @OrmRepository()
        private targetTypeRepository: TargetTypeRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<CertificationAble> | undefined> {
        this.log.info('Find all certification able');

        const list = await this.certificationAbleRepository.findAndCount({
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
        certificationAble: CertificationAble,
        targetTypeName: string,
        option?: ICrudOption
    ): Promise<CertificationAble> {
        this.log.info('Create a new certification able');
        const targetType = await this.targetTypeRepository.findOne({ where: { name: targetTypeName } });

        if (!targetType) {
            throw new HttpError(400, 'targetType is invalid');
        }

        certificationAble.id = uuid.v1();
        certificationAble.targetTypeID = targetType.id;

        return this.certificationAbleRepository.save(certificationAble);
    }

    public findOne(
        id: string,
        option?: ICrudOption
    ): Promise<CertificationAble> {
        this.log.info('Find one certification able');

        return this.certificationAbleRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        certificationAble: object,
        option?: ICrudOption
    ): Promise<CertificationAble | undefined> {
        this.log.info('Update some fields a certification able');
        await this.certificationAbleRepository.update(
            id,
            certificationAble
        );
        return this.certificationAbleRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<CertificationAble | undefined> {
        this.log.info('Delete a certification able');
        const item = await this.certificationAbleRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.certificationAbleRepository.delete(id);

        return item;
    }
}
