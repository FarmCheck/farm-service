import { Area } from '../models';
import { BaseResolver } from './BaseResolver';
import { Resolver } from 'type-graphql';

@Resolver()
export class AreaResolver extends BaseResolver(() => Area, 'area') {}
