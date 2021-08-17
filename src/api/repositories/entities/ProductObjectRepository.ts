import { EntityRepository, Repository } from 'typeorm';
import { ProductObject } from '../../models';

@EntityRepository(ProductObject)
export class ProductObjectRepository extends Repository<ProductObject> {}
