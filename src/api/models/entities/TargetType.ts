import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CertificationAble, MediaAble } from '../index';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class TargetType {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @OneToMany(type => CertificationAble, certificationAble => certificationAble.targetType)
    public certificationAbles: CertificationAble[];

    @OneToMany(type => MediaAble, mediaAble => mediaAble.targetType)
    public mediaAbles: MediaAble[];
}
