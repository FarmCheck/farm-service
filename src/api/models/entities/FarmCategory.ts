import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category, Farm } from '../index';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class FarmCategory {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({name: 'farm_id', nullable: false})
    @Field()
    public farmID: string;

    @Column({name: 'category_id', nullable: false})
    @Field()
    public categoryID: string;

    @ManyToOne(
        (type) => Farm,
        (farm) => farm.farmCategories
    )
    @JoinColumn({ name: 'farm_id' })
    @Field(() => Farm)
    @TypeormLoader()
    public farm: Farm;

    @ManyToOne(
        (type) => Category,
        (category) => category.farmCategories
    )
    @JoinColumn({ name: 'category_id' })
    @Field(() => Category)
    @TypeormLoader()
    public category: Category;
}
