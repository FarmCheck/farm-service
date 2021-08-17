import { EntityRepository, Repository } from 'typeorm';
import { CertificationAble } from '../../models';

@EntityRepository(CertificationAble)
export class CertificationAbleRepository extends Repository<CertificationAble> {}
