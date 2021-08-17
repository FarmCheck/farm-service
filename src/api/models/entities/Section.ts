import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Diary } from './Diary';
import { Process } from './Process';
import { Area } from './Area';
import { ProductObject } from './ProductObject';

@Entity()
@ObjectType()
export class Section {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'product_object_id', nullable: false })
    @Field()
    public productObjectID: string;

    @Column({ name: 'process_id', nullable: false })
    @Field()
    public processID: string;

    @Column({ name: 'area_id', nullable: false })
    @Field()
    public areaID: string;

    @Column({ nullable: false })
    @Field()
    public code: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    // 0: activate, 1: deactivate
    @Column({ default: 0 })
    @Field()
    public status: number;

    // 0: season, 1: batch
    @Column({ default: 0 })
    @Field({ description: '0: season, 1: batch' })
    public type: number;

    @Column({ name: 'created_at', default: 'now()' })
    @Field()
    public createdAt: string;

    @Column({ name: 'diaries_total', default: 0 })
    @Field()
    public diariesTotal: number;

    @OneToMany((type) => Diary, (diary) => diary.section)
    @Field(() => [Diary])
    @TypeormLoader()
    public diaries: Diary[];

    @ManyToOne((type) => Process, (process) => process.sections)
    @JoinColumn({ name: 'process_id' })
    @Field(() => Process)
    @TypeormLoader()
    public process: Process;

    @ManyToOne((type) => Area, (area) => area.sections)
    @JoinColumn({ name: 'area_id' })
    @Field(() => Area)
    @TypeormLoader()
    public area: Area;

    @ManyToOne((type) => ProductObject, (productObject) => productObject.sections)
    @JoinColumn({ name: 'product_object_id' })
    @Field(() => ProductObject)
    @TypeormLoader()
    public productObject: ProductObject;
}
