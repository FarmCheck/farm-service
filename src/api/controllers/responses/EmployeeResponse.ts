import { Exclude, Expose, Type } from 'class-transformer';
import {
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID, Max, Min, ValidateNested
} from 'class-validator';
import { FarmResponse } from './index';

@Exclude()
export class BaseEmployee {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public farmID: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsNotEmpty()
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
    @IsNotEmpty()
    @IsUrl()
    public avatar: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isVerifiedPhoneNumber: boolean;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    public status: number;

    @Expose()
    @IsDateString()
    @IsOptional()
    public createdAt: string;

    @Expose()
    @IsDateString()
    @IsOptional()
    public updatedAt: string;

    @Expose()
    @IsDateString()
    @IsOptional()
    public deletedAt: string;
}

@Exclude()
export class EmployeeResponse extends BaseEmployee {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}

@Exclude()
export class EmployeeBaseResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsNotEmpty()
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
    @IsNumber()
    @Min(0)
    @Max(1)
    public status: number;
}

@Exclude()
export class EmployeeDetailResponse extends BaseEmployee {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => FarmResponse)
    public farm: FarmResponse;
}
