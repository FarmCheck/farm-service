import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product, Organization, Certification, Farm, TargetType } from '../index';

@Entity()
@ObjectType()
export class CertificationAble {
    @PrimaryColumn('uuid')
    @Field()
    public id: string;

    @Column({ name: 'target_id', nullable: false })
    public targetID: string;

    @Column({ name: 'target_type_id', nullable: true })
    public targetTypeID: string;

    @Column({ name: 'organization_id', nullable: true })
    public organizationID: string;

    @Column({ name: 'certification_id', nullable: false })
    public certificationID: string;

    @Column({ nullable: true })
    @Field()
    public description: string;

    @Column({ name: 'created_at', default: 'now()' })
    @Field()
    public createdAt: string;

    @Column({ name: 'effective_at', default: 'now()' })
    @Field()
    public effectiveAt: string;

    @Column({ type: 'text', array: true, default: [] })
    @Field(() => [String])
    public urls: string[];

    @ManyToOne(
        (type) => Product || Farm,
        (ownerCertification) => ownerCertification.certificationAbles
    )
    @JoinColumn({ name: 'target_id' })
    public target: Product | Farm;

    @ManyToOne(
        (type) => Certification,
        (certification) => certification.certificationAbles
    )
    @JoinColumn({ name: 'certification_id' })
    @Field(() => Certification)
    @TypeormLoader()
    public certification: Certification;

    @ManyToOne(
        (type) => Organization,
        (organization) => organization.certificationAbles
    )
    @JoinColumn({ name: 'organization_id' })
    @Field(() => Organization)
    @TypeormLoader()
    public organization: Organization;

    @ManyToOne(
        (type) => TargetType,
        (targetType) => targetType.certificationAbles
    )
    @JoinColumn({ name: 'target_type_id' })
    public targetType: TargetType;
}
