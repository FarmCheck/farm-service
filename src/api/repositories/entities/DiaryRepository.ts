import { EntityRepository, Repository } from 'typeorm';
import { Diary } from '../../models';

@EntityRepository(Diary)
export class DiaryRepository extends Repository<Diary> {}
