import { EntityRepository, Repository } from 'typeorm';
import { FarmPayment } from '../../models';

@EntityRepository(FarmPayment)
export class FarmPaymentRepository extends Repository<FarmPayment> {}
