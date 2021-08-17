import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Step } from './Step';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class StepProperty {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'step_id', nullable: false })
    @Field()
    public stepID: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @Column({ name: 'is_required', default: false })
    @Field()
    public isRequired: boolean;

    // 0: 'text', 1: 'number', 2: 'link'
    @Column({ default: 0 })
    @Field({ description: '0: text, 1: number, 2: link' })
    public type: number;

    @Column({ nullable: false })
    @Field()
    public value: string;

    @ManyToOne((type) => Step, (step) => step.stepProperties)
    @JoinColumn({ name: 'step_id' })
    public step: Step;
}
