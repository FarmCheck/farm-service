import { EntityRepository, Repository } from 'typeorm';
import { Organization } from '../../models';

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {}
