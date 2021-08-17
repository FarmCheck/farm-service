import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base, Farm, Area } from '../index';
import { Exclude } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class Employee extends Base {
    @Column({ name: 'farm_id', nullable: false })
    @Field()
    public farmID: string;

    @Column({ nullable: false })
    @Field()
    public code: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    // 0: 'employee', 1: 'farmer', 2: 'manager'
    @Column({ nullable: false, default: 0 })
    @Field({description: '0: employee, 1: farmer, 2: manager'})
    public role: number;

    @Column({ nullable: false })
    @Field()
    public phoneNumber: string;

    @Column({ name: 'is_verified_phone_number', default: false })
    @Field()
    public isVerifiedPhoneNumber: boolean;

    @Column({ default: false })
    @Field()
    public avatar: string;

    @Column({ name: 'full_text_search_col', nullable: false, select: false })
    @Exclude()
    public fullTextSearch: string;

    @ManyToOne((type) => Farm, (farm) => farm.employees)
    @JoinColumn({ name: 'farm_id' })
    @Field(() => Farm)
    @TypeormLoader()
    public farm: Farm;

    @OneToMany((type) => Area, (area) => area.employee)
    @Field(() => [Area])
    @TypeormLoader()
    public areas: Area[];
}
