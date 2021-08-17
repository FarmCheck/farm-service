import { BaseResolver } from './BaseResolver';
import { Diary } from '../models';
import { Resolver } from 'type-graphql';

@Resolver()
export class DiaryResolver extends BaseResolver(() => Diary, 'diary') {}
