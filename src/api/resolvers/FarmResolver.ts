import { Resolver } from 'type-graphql';
import { Farm } from '../models';
import { BaseResolver } from './BaseResolver';

@Resolver()
export class FarmResolver extends BaseResolver(() => Farm, 'farm') {}
