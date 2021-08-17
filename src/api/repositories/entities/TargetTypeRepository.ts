import { EntityRepository, Repository } from 'typeorm';
import { TargetType } from '../../models';

@EntityRepository(TargetType)
export class TargetTypeRepository extends Repository<TargetType> {}
