import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Base, Farm, Area, Product } from '../index';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class Location extends Base {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ nullable: false })
    @Field()
    public province: string;

    @Column({ name: 'province_code', nullable: false })
    @Field()
    public provinceCode: string;

    @Column({ nullable: false })
    @Field()
    public district: string;

    @Column({ name: 'district_code', nullable: false })
    @Field()
    public districtCode: string;

    @OneToMany((type) => Farm, (farm) => farm.location)
    @Field(() => [Farm])
    @TypeormLoader()
    public farms: Farm[];

    @OneToMany((type) => Area, (area) => area.location)
    @Field(() => [Area])
    @TypeormLoader()
    public areas: Area[];

    @OneToMany((type) => Product, (product) => product.location)
    @Field(() => [Product])
    @TypeormLoader()
    public products: Product[];
}
