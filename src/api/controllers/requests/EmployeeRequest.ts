import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';
import { BaseEmployee } from '../responses';

export class CreateEmployeeBody extends BaseEmployee {
    @Exclude()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
    public role: number;

    @Exclude()
    @IsOptional()
    @IsBoolean()
    public isVerifiedPhoneNumber: boolean;

    @Exclude()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    public status: number;

    @Exclude()
    @IsDateString()
    @IsOptional()
    public createdAt: string;

    @Exclude()
    @IsDateString()
    @IsOptional()
    public updatedAt: string;

    @Exclude()
    @IsDateString()
    @IsOptional()
    public deletedAt: string;
}

export class UpdateEmployeeBody {
    // @Expose()
    // @IsOptional()
    // @IsUUID()
    // public farmID: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
    public role: number;

    @Expose()
    @IsOptional()
    @IsString()
    public phoneNumber: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public avatar: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    public status: number;
}
