import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { SubCategory, FarmCategory } from '../index';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class Category {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @Column({ nullable: true })
    @Field()
    public code: string;

    @Column({ nullable: true })
    @Field()
    public note: string;

    @Column({ nullable: false })
    @Field()
    public url: string;

    @Column({ name: 'url_thumbnail', nullable: false })
    @Field()
    public urlThumbnail: string;

    @Column({ name: 'created_at', default: 'now()' })
    @Field()
    public createdAt: string;

    @OneToMany(type => SubCategory, subCategory => subCategory.category)
    @Field(() => [SubCategory])
    @TypeormLoader()
    public subCategories: SubCategory[];

    @OneToMany(type => FarmCategory, farmCategory => farmCategory.category)
    public farmCategories: FarmCategory[];
}
