import { Field, ObjectType } from 'type-graphql';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType({ isAbstract: true })
export abstract class Base {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    // 0: 'activate', 1: 'deactivate', 2: 'pause', 3: 'draft'
    @Column({ nullable: false, default: 0 })
    @Field()
    public status: number;

    @CreateDateColumn({ name: 'created_at', default: 'now()' })
    @Field()
    public createdAt: string;

    @UpdateDateColumn({ name: 'updated_at', default: 'now()' })
    @Field()
    public updatedAt: string;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    @Field()
    public deletedAt: string;
}

export enum EnumStatus {
    ACTIVATE = 0,
    DEACTIVATE = 1,
    PAUSE = 2,
    DRAFT = 3,
}
