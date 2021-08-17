import { Location } from '../models';
import { BaseResolver } from './BaseResolver';
import { Resolver } from 'type-graphql';

@Resolver()
export class LocationResolver extends BaseResolver(() => Location, 'location') {}
