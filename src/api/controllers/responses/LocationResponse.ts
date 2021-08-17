import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Exclude()
export class BaseLocation {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public province: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public provinceCode: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public district: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public districtCode: string;
}

@Exclude()
export class LocationResponse extends BaseLocation {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}
