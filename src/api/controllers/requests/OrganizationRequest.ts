import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUrl } from 'class-validator';

// class CreateOrganizationBody extends BaseOrganization {}

export class UpdateOrganizationBody {
    @Expose()
    @IsOptional()
    @IsUrl()
    public logo: string;

    @Expose()
    @IsOptional()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
    public description: string;
}
