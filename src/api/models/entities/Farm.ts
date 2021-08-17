import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import {
    Area,
    Base,
    CertificationAble,
    FarmCategory,
    FarmPayment,
    Location,
    MediaAble,
    Process,
    Product,
    Employee
} from '../index';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class Farm extends Base {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'location_id', nullable: true })
    public locationID: string;

    @Column({ name: 'user_id', nullable: false })
    public userID: string;

    @Column({ nullable: false })
    @Field()
    public code: string;

    @Column({ name: 'products_total', nullable: false, default: 0 })
    @Field()
    public productsTotal: number;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @Column({ nullable: true })
    @Field()
    public description: string;

    @Column({ name: 'is_verified_phone_number', default: false })
    @Field()
    public isVerifiedPhoneNumber: boolean;

    @Column({ name: 'is_verified_email', default: false })
    @Field()
    public isVerifiedEmail: boolean;

    @Column({ nullable: false })
    @Field()
    public email: string;

    @Column({ nullable: true })
    @Field()
    public logo: string;

    @Column({ nullable: true })
    @Field()
    public banner: string;

    @Column({ nullable: false })
    @Field()
    public phoneNumber: string;

    @Column({ nullable: true })
    @Field()
    public website: string;

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

    @OneToMany((type) => FarmPayment, (farmPayment) => farmPayment.farm)
    @Field(() => [FarmPayment])
    @TypeormLoader()
    public farmPayments: FarmPayment[];

    @OneToMany((type) => MediaAble, (mediaAble) => mediaAble.target)
    @Field(() => [MediaAble])
    @TypeormLoader()
    public mediaAbles: MediaAble[];

    @OneToMany(
        (type) => CertificationAble,
        (certificationAble) => certificationAble.target
    )
    @Field(() => [CertificationAble])
    @TypeormLoader()
    public certificationAbles: CertificationAble[];

    @OneToMany((type) => Area, (area) => area.farm)
    @Field(() => [Area])
    @TypeormLoader()
    public areas: Area[];

    @OneToMany((type) => Employee, (employee) => employee.farm)
    @Field(() => [Employee])
    @TypeormLoader()
    public employees: Employee[];

    @OneToMany((type) => Product, (product) => product.farm)
    @Field(() => [Product])
    @TypeormLoader()
    public products: Product[];

    @OneToMany((type) => Process, (process) => process.farm)
    @Field(() => [Process])
    @TypeormLoader()
    public processes: Process[];

    @OneToMany((type) => FarmCategory, (farmCategory) => farmCategory.farm)
    @Field(() => [FarmCategory])
    @TypeormLoader()
    public farmCategories: FarmCategory[];

    @ManyToOne((type) => Location, (location) => location.farms)
    @JoinColumn({ name: 'location_id' })
    @Field(() => Location)
    @TypeormLoader()
    public location: Location;
}
