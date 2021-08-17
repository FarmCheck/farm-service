import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, IsUUID } from 'class-validator';

@Exclude()
export class BaseOrganization {
    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public logo: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public description: string;
}

@Exclude()
export class OrganizationResponse extends BaseOrganization {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}

@Exclude()
export class OrganizationBaseResponse {
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
