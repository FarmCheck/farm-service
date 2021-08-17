import { EntityRepository, Repository } from 'typeorm';
import { Location } from '../../models';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {}
