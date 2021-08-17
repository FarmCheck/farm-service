import { EntityRepository, Repository } from 'typeorm';
import { Process } from '../../models';

@EntityRepository(Process)
export class ProcessRepository extends Repository<Process> {}
