import { EntityRepository, Repository } from 'typeorm';
import { Area } from '../../models';

@EntityRepository(Area)
export class AreaRepository extends Repository<Area> {}
