import { EntityRepository, Repository } from 'typeorm';
import { FarmCategory } from '../../models';

@EntityRepository(FarmCategory)
export class FarmCategoryRepository extends Repository<FarmCategory> {}
