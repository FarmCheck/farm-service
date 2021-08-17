import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MediaAble } from '../index';
import { Field, ObjectType } from 'type-graphql';

@Entity()
@ObjectType()
export class Media {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    // 0: 'image', 1: 'video', 2: 'document'
    @Column({ nullable: true })
    @Field()
    public type: number;

    @Column({ nullable: false })
    @Field()
    public url: string;

    @Column({ name: 'url_thumbnail', nullable: false })
    @Field()
    public urlThumbnail: string;

    @Column({ name: 'created_at', nullable: false, default: 'now()' })
    @Field()
    public createdAt: string;

    @OneToMany((type) => MediaAble, (mediaAble) => mediaAble.media)
    public mediaAbles: MediaAble[];
}
