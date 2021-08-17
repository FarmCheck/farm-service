import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base, CertificationAble, Farm, MediaAble, ProductObject, SubCategory, Location } from '../index';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class Product extends Base {
    @Column({ name: 'farm_id', nullable: false })
    @Field()
    public farmID: string;

    @Column({ name: 'sub_category_id', nullable: false })
    @Field()
    public subCategoryID: string;

    @Column({ name: 'location_id', nullable: true })
    public locationID: string;

    @Column({ nullable: false })
    @Field()
    public code: string;

    @Column({ name: 'product_objects_total', nullable: false, default: 0 })
    @Field()
    public productObjectsTotal: number;

    @Column({ nullable: false, default: '0000000000000' })
    @Field()
    public barcode: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    // 0: 'item', 1: 'kilogram', 2: 'others'
    @Column({ default: 0 })
    @Field({ description: '0: item, 1: kilogram, 2: others' })
    public unit: number;

    @Column({ nullable: true })
    @Field()
    public description: string;

    @Column({ nullable: true })
    @Field()
    public price: number;

    @Column({ nullable: true })
    @Field()
    public duration: number;

    // 0: 'day', 1: 'week', 2: 'month', 3: 'year'
    @Column({ name: 'duration_type', nullable: true })
    @Field({ description: '0: day, 1: week, 2: month, 3: year' })
    public durationType: number;

    @Column({ name: 'is_have_brand', default: false })
    @Field()
    public isHaveBrand: boolean;

    @Column({ name: 'brand_name', nullable: true })
    @Field()
    public brandName: string;

    @Column({ name: 'brand_description', nullable: true })
    @Field()
    public brandDescription: string;

    @Column({ name: 'tax_code', nullable: true })
    @Field()
    public taxCode: string;

    @Column({ nullable: true })
    @Field()
    public email: string;

    @Column({ name: 'number_phone', nullable: true })
    @Field()
    public phoneNumber: string;

    @Column({ nullable: true })
    @Field()
    public website: string;

    @Column({ nullable: true })
    @Field()
    public logo: string;

    @Column({ nullable: true })
    @Field()
    public banner: string;

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

    @OneToMany(
        () => CertificationAble,
        (certificationAble) => certificationAble.target
    )
    @Field(() => [CertificationAble])
    @TypeormLoader()
    public certificationAbles: CertificationAble[];

    @OneToMany(
        (type) => MediaAble,
        (mediaAble) => mediaAble.target
    )
    @Field(() => [MediaAble])
    @TypeormLoader()
    public mediaAbles: MediaAble[];

    @OneToMany(
        () => ProductObject,
        (productObject) => productObject.product
    )
    @Field(() => [ProductObject])
    @TypeormLoader()
    public productObjects: ProductObject[];

    @ManyToOne((type) => Location, (location) => location.products)
    @JoinColumn({ name: 'location_id' })
    @Field(() => Location)
    @TypeormLoader()
    public location: Location;

    @ManyToOne((type) => Farm, (farm) => farm.products)
    @JoinColumn({ name: 'farm_id' })
    @Field(() => Farm)
    @TypeormLoader()
    public farm: Farm;

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.products)
    @JoinColumn({ name: 'sub_category_id' })
    @Field(() => SubCategory)
    @TypeormLoader()
    public subCategory: SubCategory;
}
