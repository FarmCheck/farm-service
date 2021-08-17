import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Process } from './Process';
import { StepProperty } from './StepProperty';
import { Diary } from './Diary';

@Entity()
@ObjectType()
export class Step {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'process_id', nullable: false })
    @Field()
    public processID: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @Column({ name: 'is_internal', default: false })
    @Field()
    public isInternal: boolean;

    @Column({ nullable: true })
    @Field()
    public description: string;

    @Column({ default: 0, nullable: false })
    @Field(() => Int)
    public order: number;

    @Column({ name: 'diaries_total', default: 0 })
    @Field()
    public diariesTotal: number;

    @ManyToOne((type) => Process, (process) => process.steps)
    @JoinColumn({ name: 'process_id' })
    @Field(() => Process)
    @TypeormLoader()
    public process: Process;

    @OneToMany(
        (type) => StepProperty,
        (stepProperty) => stepProperty.step
    )
    @Field(() => [StepProperty])
    @TypeormLoader()
    public stepProperties: StepProperty[];

    @OneToMany((type) => Diary, (diary) => diary.step)
    @Field(() => [Diary])
    @TypeormLoader()
    public diaries: Diary[];
}
