
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

// class CreateLocationBody extends BaseLocation {}

export class UpdateLocationBody {
    @Expose()
    @IsOptional()
    @IsString()
    public province: string;

    @Expose()
    @IsOptional()
    @IsString()
    public provinceCode: string;

    @Expose()
    @IsOptional()
    @IsString()
    public district: string;

    @Expose()
    @IsOptional()
    @IsString()
    public districtCode: string;
}
