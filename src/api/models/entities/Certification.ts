import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CertificationAble } from '../index';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class Certification {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @Column({ nullable: false })
    @Field()
    public code: string;

    @Column({ nullable: false })
    @Field()
    public logo: string;

    @Column({ name: 'created_at', default: 'now()' })
    @Field()
    public createdAt: string;

    @OneToMany((type) => CertificationAble, (certificationAble) => certificationAble.certification)
    @Field(() => CertificationAble)
    @TypeormLoader()
    public certificationAbles: CertificationAble[];
}
