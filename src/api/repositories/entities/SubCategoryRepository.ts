import { EntityRepository, Repository } from 'typeorm';
import { SubCategory } from '../../models';

@EntityRepository(SubCategory)
export class SubCategoryRepository extends Repository<SubCategory> {}
