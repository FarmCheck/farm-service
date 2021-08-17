import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../../models';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
