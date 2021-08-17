import { EntityRepository, Repository } from 'typeorm';
import { Media } from '../../models';

@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {}
