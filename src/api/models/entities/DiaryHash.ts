import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Diary } from './Diary';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity({ name: 'diary_hash' })
@ObjectType()
export class DiaryHash {
    @PrimaryColumn({ type: 'uuid', name: 'diary_id' })
    @Field()
    public diaryId: string;

    @Column({ type: 'varchar', unique: true })
    @Field()
    public hash: string;

    @Column()
    @Field()
    public height: number;

    @OneToOne(() => Diary, diary => diary.hash)
    @JoinColumn({ name: 'diary_id' })
    @Field(() => Diary)
    @TypeormLoader()
    public diary: Diary;

    constructor(partial: Omit<Partial<DiaryHash>, 'diary'>) {
        Object.assign(this, partial);
    }
}
