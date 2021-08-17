import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Expose, Type } from 'class-transformer';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Step } from './Step';
import { Section } from './Section';
import { DiaryHash } from './DiaryHash';

@Entity()
@ObjectType()
export class Diary {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'step_id', nullable: false })
    @Field()
    public stepID: string;

    @Column({ name: 'section_id', nullable: false })
    @Field()
    public sectionID: string;

    @Column({ nullable: false })
    @Field()
    public name: string;

    @Column({ nullable: true })
    @Field()
    public description: string;

    @Column({ type: 'text', array: true, default: [] })
    @Field(() => [String])
    public urls: string[];

    @Column({ name: 'created_at', default: 'now()' })
    @Field()
    public createdAt: string;

    @ManyToOne((type) => Step, (step) => step.diaries)
    @JoinColumn({ name: 'step_id' })
    @Field(() => Step)
    @TypeormLoader()
    public step: Step;

    @ManyToOne((type) => Section, (section) => section.diaries)
    @JoinColumn({ name: 'section_id' })
    @Field(() => Section)
    @TypeormLoader()
    public section: Section;

    @OneToOne(() => DiaryHash, diaryHash => diaryHash.diary, { eager: true })
    @Field(() => DiaryHash, { nullable: true })
    @TypeormLoader()
    public hash: DiaryHash;

    @Expose()
    @Type(() => Boolean)
    @Field({ description: 'must query with "hash" relation' })
    public get isVerified(): boolean {
        return !!this.hash;
    }
}
