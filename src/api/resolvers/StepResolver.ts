import { Step } from '../models';
import { BaseResolver } from './BaseResolver';
import { Resolver } from 'type-graphql';

@Resolver()
export class StepResolver extends BaseResolver(() => Step, 'step') {}
