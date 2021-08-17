import { EntityRepository, Repository } from 'typeorm';
import { Section } from '../../models';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {}
