import { EntityRepository, Repository } from 'typeorm';
import { DiaryHash } from '../../models';

@EntityRepository(DiaryHash)
export class DiaryHashRepository extends Repository<DiaryHash> {}
