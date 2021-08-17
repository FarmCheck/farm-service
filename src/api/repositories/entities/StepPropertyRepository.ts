import { EntityRepository, Repository } from 'typeorm';
import { StepProperty } from '../../models';

@EntityRepository(StepProperty)
export class StepPropertyRepository extends Repository<StepProperty> {}
