import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base, Farm, Location, MediaAble, ProductObject, Section, Employee } from '../index';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class Area extends Base {
    @Column({ name: 'location_id', nullable: true })
    @Field()
    public locationID: string;

    @Column({ name: 'employee_id', nullable: true })
    @Field()
    public employeeID: string;

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

    // 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others'
    @Column({ nullable: false, default: 0 })
    @Field({ description: '0: field area, 1: farming area, 2: production area, 3: field & product area, 4: field & production area, 5: others' })
    public type: number;

    @Column({ nullable: true })
    @Field()
    public description: string;

    @Column({ nullable: true })
    @Field()
    public address: string;

    @Column({ nullable: true })
    @Field()
    public latitude: string;

    @Column({ nullable: true })
    @Field()
    public longitude: string;

    @Column({ name: 'full_text_search_col', nullable: false, select: false })
    @Exclude()
    public fullTextSearch: string;

    @OneToMany((type) => MediaAble, (mediaAble) => mediaAble.target)
    @Field(() => [MediaAble])
    @TypeormLoader()
    public mediaAbles: MediaAble[];

    @OneToMany((type) => ProductObject, (productObject) => productObject.area)
    @Field(() => [ProductObject])
    @TypeormLoader()
    public productObjects: ProductObject[];

    @OneToMany((type) => Section, (section) => section.area)
    @Field(() => [Section])
    @TypeormLoader()
    public sections: Section[];

    @ManyToOne((type) => Location, (location) => location.areas)
    @JoinColumn({ name: 'location_id' })
    @Field(() => Location)
    @TypeormLoader()
    public location: Location;

    @ManyToOne((type) => Farm, (farm) => farm.areas)
    @JoinColumn({ name: 'farm_id' })
    @Field(() => Farm)
    @TypeormLoader()
    public farm: Farm;

    @ManyToOne((type) => Employee, (employee) => employee.areas)
    @JoinColumn({ name: 'employee_id' })
    @Field(() => Employee)
    @TypeormLoader()
    public employee: Employee;
}
