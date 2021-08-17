import { Exclude, Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean, IsDateString,
    IsEmail,
    IsLatitude, IsLongitude,
    IsNotEmpty, IsNumber, IsObject,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    IsUUID, ValidateNested
} from 'class-validator';
import {  } from '../LocationController';
import { CertificationAbleResponse, LocationResponse, MediaBaseResponse } from './index';

@Exclude()
export class BaseFarm {
    @Expose()
    @IsOptional()
    @IsUUID()
    public locationID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public userID: string;

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
    @IsString()
    public description: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isVerifiedPhoneNumber: boolean;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isVerifiedEmail: boolean;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public logo: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public banner: string;

    @Expose()
    @IsNotEmpty()
    @IsPhoneNumber()
    public phoneNumber: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public website: string;

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
    public productsTotal: number;

    @Expose()
    @IsOptional()
    @IsNumber()
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
export class FarmResponse extends BaseFarm {
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
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];
}

@Exclude()
export class FarmBaseResponse extends FarmResponse {
    @Exclude()
    @IsDateString()
    @IsOptional()
    public updatedAt: string;

    @Exclude()
    @IsDateString()
    @IsOptional()
    public deletedAt: string;

    @Exclude()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];
}

@Exclude()
export class FarmDetailResponse extends BaseFarm {
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
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CertificationAbleResponse)
    public certificationAbles: CertificationAbleResponse[];
}

@Exclude()
export class FarmDashBoardResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public areasTotal: number;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public productObjectsTotal: number;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public sectionsTotal: number;
}
