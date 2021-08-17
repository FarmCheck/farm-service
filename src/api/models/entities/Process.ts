import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Step, ProductObject, Section, Farm, Base } from '../index';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class Process extends Base {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'farm_id', nullable: false })
    @Field()
    public farmID: string;

    @Column({ nullable: false })
    @Field()
    public code: string;

    @Column({ name: 'product_objects_total', nullable: false, default: 0 })
    @Field()
    public productObjectsTotal: number;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @Column({ default: 0 })
    @Field()
    public quantity: number;

    @Column({ name: 'is_have_step', default: false })
    @Field()
    public isHaveStep: boolean;

    @Column({ name: 'full_text_search_col', nullable: false, select: false })
    @Exclude()
    public fullTextSearch: string;

    @OneToMany((type) => Step, (step) => step.process)
    @Field(() => [Step])
    @TypeormLoader()
    public steps: Step[];

    @OneToMany((type) => ProductObject, (productObject) => productObject.process)
    @Field(() => [ProductObject])
    @TypeormLoader()
    public productObjects: ProductObject[];

    @OneToMany((type) => Section, (section) => section.process)
    @Field(() => [Section])
    @TypeormLoader()
    public sections: Section[];

    @ManyToOne((type) => Farm, (farm) => farm.processes)
    @JoinColumn({ name: 'farm_id' })
    @Field(() => Farm)
    @TypeormLoader()
    public farm: Farm;
}
