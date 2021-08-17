import { Exclude, Expose, Type } from 'class-transformer';
import {
    Contains,
    IsArray,
    IsBoolean,
    IsDateString,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    Length, Max, Min,
    ValidateNested
} from 'class-validator';
import { CertificationAbleResponse, FarmBaseResponse , LocationResponse, MediaBaseResponse } from './index';

@Exclude()
export class BaseProduct {
    @Expose()
    @IsOptional()
    @IsUUID()
    public locationID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public farmID: string;

    @Expose()
    @IsNotEmpty()
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
    @IsNotEmpty()
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
    public productObjectsTotal: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
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
export class ProductResponse extends BaseProduct {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    // @Expose()
    // @IsObject()
    // @ValidateNested()
    // @Type(() => LocationResponse)
    // public location: LocationResponse;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];
}

@Exclude()
export class ProductBaseResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
    @IsString()
    @Length(13, 13)
    public barcode: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
    public status: number;
}

@Exclude()
export class ProductDetailResponse extends BaseProduct {
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
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CertificationAbleResponse)
    public certificationAbles: CertificationAbleResponse[];

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];
}

@Exclude()
export class ProductPortalResponse extends ProductBaseResponse {
    @Expose()
    @ValidateNested()
    @Type(() => FarmBaseResponse)
    public farm: FarmBaseResponse;

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => LocationResponse)
    public location: LocationResponse;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CertificationAbleResponse)
    public certificationAbles: CertificationAbleResponse[];
}
