import {
    IsArray,
    IsBoolean,
    IsDateString, IsEmail, IsLatitude, IsLongitude,
    IsNumber,
    IsOptional, IsPhoneNumber,
    IsString, IsUrl,
    IsUUID,
    ValidateNested
} from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { CreateMediaBaseBody } from './index';
import { BaseFarm } from '../responses';

export class CreateFarmBody extends BaseFarm {
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true})
    @Type(() => CreateMediaBaseBody)
    public medias: CreateMediaBaseBody[];

    @Exclude()
    @IsOptional()
    @IsNumber()
    public productsTotal: number;

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
    @IsBoolean()
    public isVerifiedEmail: boolean;

    @Exclude()
    @IsOptional()
    @IsNumber()
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

export class UpdateFarmBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public locationID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public userID: string;

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
    @IsString()
    public description: string;

    @Expose()
    @IsOptional()
    @IsEmail()
    public email: string;

    @Expose()
    @IsOptional()
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
    public status: number;
}
