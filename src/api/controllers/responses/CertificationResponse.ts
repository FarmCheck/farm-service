import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

@Exclude()
export class BaseCertification {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public logo: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public createdAt: string;
}

@Exclude()
export class CertificationResponse extends BaseCertification {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}

@Exclude()
export class CertificationBaseResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public logo: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
}
