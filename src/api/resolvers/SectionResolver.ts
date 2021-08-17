import { BaseResolver } from './BaseResolver';
import { Section } from '../models';
import { Resolver } from 'type-graphql';

@Resolver()
export class SectionResolver extends BaseResolver(() => Section, 'section') {}
