import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';
import { BaseCertification } from '../responses';

export class CreateCertificationBody extends BaseCertification {
    @Exclude()
    @IsOptional()
    @IsDateString()
    public createdAt: string;
}

export class UpdateCertificationBody {
    @Expose()
    @IsOptional()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public logo: string;
}
