import { BaseResolver } from './BaseResolver';
import { Certification } from '../models';
import { Resolver } from 'type-graphql';

@Resolver()
export class CertificationResolver extends BaseResolver(() => Certification, 'certification') {}
