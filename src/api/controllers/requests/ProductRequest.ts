import {
    Contains,
    IsArray,
    IsBoolean,
    IsDateString, IsLatitude, IsLongitude,
    IsNumber,
    IsOptional,
    IsString, IsUrl,
    IsUUID, Length, Max, Min,
    ValidateNested
} from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { CreateMediaBaseBody } from './index';
import { BaseProduct } from '../responses';

export class CreateProductBody extends BaseProduct {
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true})
    @Type(() => CreateMediaBaseBody)
    public medias: CreateMediaBaseBody[];

    @Exclude()
    @IsOptional()
    @IsNumber()
    public productObjectsTotal: number;

    @Exclude()
    @IsOptional()
    @IsString()
    public code: string;

    @Exclude()
    @IsOptional()
    @IsBoolean()
    public isVerifiedPhoneNumber: boolean;

    @Exclude()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
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

export class UpdateProductBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public locationID: string;

    // @Expose()
    // @IsOptional()
    // @IsUUID()
    // public farmID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public subCategoryID: string;

    @Expose()
    @IsOptional()
    @IsString()
    @Length(13, 13)
    public barcode: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
    @IsString()
    public name: string;

    // 0: 'item', 1: 'kilogram', 2: 'others'
    @Expose()
    @IsOptional()
    @IsNumber()
    public unit: number;

    @Expose()
    @IsOptional()
    @IsString()
    public description: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    public duration: number;

    // 0: 'day', 1: 'week', 2: 'month', 3: 'year'
    @Expose()
    @IsOptional()
    @IsNumber()
    public durationType: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    public price: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isHaveBrand: boolean;

    @Expose()
    @IsOptional()
    @IsString()
    public brandName: string;

    @Expose()
    @IsOptional()
    @IsString()
    public brandDescription: string;

    @Expose()
    @IsOptional()
    @IsString()
    @Length(14, 14)
    @Contains('-')
    public taxCode: string;

    @Expose()
    @IsOptional()
    @IsString()
    public email: string;

    @Expose()
    @IsOptional()
    @IsString()
    public phoneNumber: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isVerifiedPhoneNumber: boolean;

    @Expose()
    @IsOptional()
    @IsUrl()
    public website: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public logo: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public banner: string;

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
    @Min(0)
    @Max(2)
    public status: number;
}
