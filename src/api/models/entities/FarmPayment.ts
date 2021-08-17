import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base, Farm } from '../index';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class FarmPayment extends Base {
    @Column({ name: 'farm_id', nullable: false })
    @Field()
    public farmID: string;

    // 0: banking card, 1: credit card, 2: debit card
    @Column({ nullable: false })
    @Field({ description: '0: banking card, 1: credit card, 2: debit card' })
    public type: number;

    @Column({ nullable: false })
    @Field()
    public provider: string;

    @Column({ name: 'account_no', nullable: false })
    @Field()
    public accountNo: string;

    @Column({ name: 'expired_at', default: 'now()' })
    @Field()
    public expiredAt: string;

    @ManyToOne((type) => Farm, (farm) => farm.farmPayments)
    @JoinColumn({ name: 'farm_id' })
    @Field(() => Farm)
    @TypeormLoader()
    public farm: Farm;
}
