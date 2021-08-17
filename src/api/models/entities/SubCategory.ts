import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Category, Product } from '../index';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class SubCategory {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'category_id', nullable: false })
    @Field()
    public categoryID: string;

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

    @ManyToOne(type => Category, category => category.subCategories)
    @JoinColumn({ name: 'category_id' })
    @Field(() => Category)
    @TypeormLoader()
    public category: Category;

    @OneToMany(type => Product, product => product.subCategory)
    @Field(() => [Product])
    @TypeormLoader()
    public products: Product[];
}
