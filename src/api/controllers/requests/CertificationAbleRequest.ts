import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseCertificationAble } from '../responses';

export  class CreateCertificationAbleBody extends BaseCertificationAble {
    // product || farm
    @Expose()
    @IsNotEmpty()
    @IsString()
    public targetType: string;

    @Exclude()
    @IsOptional()
    @IsUUID()
    public targetTypeID: string;

    @Exclude()
    @IsOptional()
    @IsDateString()
    public createdAt: string;
}

export class UpdateCertificationAbleBody {
    // product || farm
    @Expose()
    @IsOptional()
    @IsString()
    public targetType: string;

    @Exclude()
    @IsOptional()
    @IsUUID()
    public targetID: string;

    @Exclude()
    @IsOptional()
    @IsUUID()
    public organizationID: string;

    @Exclude()
    @IsOptional()
    @IsUUID()
    public certificationID: string;
}
