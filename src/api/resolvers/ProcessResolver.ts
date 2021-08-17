import { BaseResolver } from './BaseResolver';
import { Process } from '../models';
import { Resolver } from 'type-graphql';

@Resolver()
export class ProcessResolver extends BaseResolver(() => Process, 'process') {}
