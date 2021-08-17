import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Area, Base, MediaAble, Process, Product, Section } from '../index';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class ProductObject extends Base {
    @Column({ name: 'product_id', nullable: false })
    @Field()
    public productID: string;

    @Column({ name: 'process_id', nullable: false })
    @Field()
    public processID: string;

    @Column({ name: 'area_id', nullable: false })
    @Field()
    public areaID: string;

    @Column({ nullable: false, unique: true })
    @Field()
    public code: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    // 0: 'field plant', 1: 'farming plant', 2: 'production plant'
    @Column({ nullable: false, default: 0 })
    @Field({ description: '0: field plant, 1: farming plant, 2: production plant' })
    public type: number;

    // 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others'
    @Column({ name: 'object_type', nullable: false, default: 0 })
    @Field({ description: '0: tree, 1: bed, 2: all, 3: farm, 4: closed farm, 5: others' })
    public objectType: number;

    @Column({ nullable: true })
    @Field()
    public description: string;

    @Column({ name: 'full_text_search_col', nullable: false, select: false })
    @Exclude()
    public fullTextSearch: string;

    @OneToMany((type) => MediaAble, (mediaAble) => mediaAble.target)
    @Field(() => [MediaAble])
    @TypeormLoader()
    public mediaAbles: MediaAble[];

    @OneToMany((type) => Section, (section) => section.productObject)
    @Field(() => [Section])
    @TypeormLoader()
    public sections: Section[];

    @ManyToOne((type) => Product, (product) => product.productObjects)
    @JoinColumn({ name: 'product_id' })
    @Field(() => Product)
    @TypeormLoader()
    public product: Product;

    @ManyToOne((type) => Process, (process) => process.productObjects)
    @JoinColumn({ name: 'process_id' })
    @Field(() => Process)
    @TypeormLoader()
    public process: Process;

    @ManyToOne((type) => Area, (area) => area.productObjects)
    @JoinColumn({ name: 'area_id' })
    @Field(() => Area)
    @TypeormLoader()
    public area: Area;
}
