import { Organization } from '../models';
import { BaseResolver } from './BaseResolver';
import { Resolver } from 'type-graphql';

@Resolver()
export class OrganizationResolver extends BaseResolver(() => Organization, 'organization') {}
