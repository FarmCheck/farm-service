import { Exclude, Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsDateString,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsNumber, IsObject,
    IsOptional,
    IsString,
    IsUUID, Max, Min, ValidateNested
} from 'class-validator';
import { FarmResponse, LocationResponse, MediaBaseResponse, ProductObjectBaseResponse, EmployeeBaseResponse } from './index';

@Exclude()
export class BaseArea {
    @Expose()
    @IsOptional()
    @IsUUID()
    public locationID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public employeeID: string;

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

    // 0: 'field area', 1: 'farming area', 2: 'production area', 3: 'field & product area', 4: 'field & production area', 5: 'others'
    @IsOptional()
    @Expose()
    @IsNumber()
    public type: number;

    @Expose()
    @IsOptional()
    @IsString()
    public description: string;

    @Expose()
    @IsOptional()
    @IsString()
    public address: string;

    @Expose()
    @IsOptional()
    @IsLatitude()
    public latitude: string;

    @Expose()
    @IsOptional()
    @IsLongitude()
    public longitude: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    public productObjectsTotal: number;

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
export class AreaResponse extends BaseArea {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsArray()
    @ValidateNested()
    @Type(() => ProductObjectBaseResponse)
    public productObjects: ProductObjectBaseResponse[];

    @Expose()
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];
}

@Exclude()
export class AreaBaseResponse {
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
    @Max(1)
    public status: number;
}

@Exclude()
export class AreaDetailResponse extends BaseArea {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => LocationResponse)
    public location: LocationResponse;

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => FarmResponse)
    public farm: FarmResponse;

    @Expose()
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => EmployeeBaseResponse)
    public employee: EmployeeBaseResponse;
}
