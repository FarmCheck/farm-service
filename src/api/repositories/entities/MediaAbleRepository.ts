import { EntityRepository, Repository } from 'typeorm';
import { MediaAble } from '../../models';

@EntityRepository(MediaAble)
export class MediaAbleRepository extends Repository<MediaAble> {}
