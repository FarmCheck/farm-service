import { EntityRepository, Repository } from 'typeorm';
import { DiarySyncFailed } from '../../../api/models';

@EntityRepository(DiarySyncFailed)
export class DiarySyncFailedRepository extends Repository<DiarySyncFailed> {}
