import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Area, Farm, Media, Product, ProductObject, TargetType } from '../index';
import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';

@Entity()
@ObjectType()
export class MediaAble {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'target_id', nullable: false })
    @Field()
    public targetID: string;

    @Column({ name: 'target_type_id', nullable: true })
    @Field()
    public targetTypeID: string;

    @Column({ name: 'media_id', nullable: false })
    @Field()
    public mediaID: string;

    @ManyToOne((type) => Media, (media) => media.mediaAbles)
    @JoinColumn({ name: 'media_id' })
    @Field(() => Media)
    @TypeormLoader()
    public media: Media;

    @ManyToOne((type) => Area || Product || ProductObject || Farm, (ownerImage) => ownerImage.mediaAbles)
    @JoinColumn({ name: 'target_id' })
    public target: Area | Product | ProductObject | Farm;

    @ManyToOne(
        (type) => TargetType,
        (targetType) => targetType.mediaAbles
    )
    @JoinColumn({ name: 'target_type_id' })
    @Field(() => TargetType)
    @TypeormLoader()
    public targetType: TargetType;
}
