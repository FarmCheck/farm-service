import {
    IsArray,
    IsDateString,
    IsLatitude, IsLongitude,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID, Max, Min,
    ValidateNested
} from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { CreateMediaBaseBody } from './index';
import { BaseArea } from '../responses';

export class CreateAreaBody extends BaseArea {
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

@Exclude()
export class UpdateAreaBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public locationID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public employeeID: string;

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
    @Min(0)
    @Max(1)
    public status: number;
}
