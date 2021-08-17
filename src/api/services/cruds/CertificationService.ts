import { Entity } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../../decorators/Logger';
import uuid from 'uuid';
import { CertificationRepository } from '../../repositories';
import { Certification } from '../../models';
import { CListData, ICrudOption } from '../index';
import { Helper } from '../../../common';

@Entity()
export class CertificationService {
    constructor(
        @OrmRepository()
        private certificationRepository: CertificationRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public async find(
        option?: ICrudOption
    ): Promise<CListData<Certification> | undefined> {
        this.log.info('Find all certification');
        const list = await this.certificationRepository.findAndCount({
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
        certification: Certification,
        option?: ICrudOption
    ): Promise<Certification> {
        this.log.info('Create a new certification');
        certification.id = uuid.v1();
        certification.code = certification.code ?? await Helper.combineFirstCharacterAndLastWord(certification.name);

        return this.certificationRepository.save(certification);
    }

    public findOne(
        id: string,
        option?: ICrudOption
    ): Promise<Certification> {
        this.log.info('Find one certification');
        return this.certificationRepository.findOne(id, {
            select: option.select,
            relations: option.relations,
        });
    }

    public async update(
        id: string,
        certification: object,
        option?: ICrudOption
    ): Promise<Certification | undefined> {
        this.log.info('Update some fields a certification');
        await this.certificationRepository.update(
            id,
            certification
        );
        return this.certificationRepository.findOne(id);
    }

    public async delete(
        id: string,
        option?: ICrudOption
    ): Promise<Certification | undefined> {
        this.log.info('Delete a certification');
        const item = await this.certificationRepository.findOne(id);
        if (item === undefined) {
            return undefined;
        }
        await this.certificationRepository.delete(id);

        return item;
    }
}
