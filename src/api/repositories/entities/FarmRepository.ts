import { EntityRepository, Repository } from 'typeorm';
import { Farm } from '../../models';

@EntityRepository(Farm)
export class FarmRepository extends Repository<Farm> {}
