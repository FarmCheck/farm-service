import { EntityRepository, Repository } from 'typeorm';
import { Step } from '../../models';

@EntityRepository(Step)
export class StepRepository extends Repository<Step> {}
