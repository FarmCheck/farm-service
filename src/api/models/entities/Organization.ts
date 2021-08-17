import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CertificationAble } from '../index';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class Organization {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ nullable: false })
    @Field()
    public logo: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @Column({ nullable: false })
    @Field()
    public description: string;

    @OneToMany(
        (type) => CertificationAble,
        (certificationAble) => certificationAble.organization
    )
    @Field(() => [CertificationAble])
    @TypeormLoader()
    public certificationAbles: CertificationAble[];
}
