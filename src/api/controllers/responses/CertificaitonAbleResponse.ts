import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { CertificationBaseResponse, OrganizationBaseResponse } from './index';

@Exclude()
export class BaseCertificationAble {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public targetID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public targetTypeID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public organizationID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public certificationID: string;

    @Expose()
    @IsOptional()
    @IsString()
    public description: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public createdAt: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public effectiveAt: string;

    @Expose()
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    public urls: string[];
}

@Exclude()
export class CertificationAbleResponse extends BaseCertificationAble {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Exclude()
    @IsNotEmpty()
    @IsUUID()
    public targetID: string;

    @Exclude()
    @IsNotEmpty()
    @IsString()
    public targetTypeID: string;

    @Exclude()
    @IsOptional()
    @IsUUID()
    public organizationID: string;

    @Exclude()
    @IsNotEmpty()
    @IsUUID()
    public certificationID: string;

    @Expose()
    @ValidateNested()
    @Type(() => OrganizationBaseResponse)
    public organization: OrganizationBaseResponse;

    @Expose()
    @ValidateNested()
    @Type(() => CertificationBaseResponse)
    public certification: CertificationBaseResponse;
}
