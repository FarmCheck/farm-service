import { EntityRepository, Repository } from 'typeorm';
import { Certification } from '../../models';

@EntityRepository(Certification)
export class CertificationRepository extends Repository<Certification> {}
