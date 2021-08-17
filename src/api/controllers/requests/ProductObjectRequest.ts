import { IsArray, IsDateString, IsNumber, IsOptional, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { CreateMediaBaseBody } from './index';
import { BaseProductObject } from '../responses';

export class CreateProductObjectBody extends BaseProductObject {
    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true})
    @Type(() => CreateMediaBaseBody)
    public medias: CreateMediaBaseBody[];

    @Exclude()
    @IsOptional()
    @IsString()
    public code: string;

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

export class UpdateProductObjectBody {
    // @Expose()
    // @IsOptional()
    // @IsUUID()
    // public productID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public processID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public areaID: string;

    @IsOptional()
    @Expose()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
    @IsString()
    public name: string;

    // 0: 'field plant', 1: 'farming plant', 2: 'production plant'
    @IsOptional()
    @Expose()
    @IsNumber()
    public type: number;

    // 0: 'tree', 1: 'bed', 2: 'all', 3: 'farm', 4: 'closed farm', 5: 'others'
    @IsOptional()
    @Expose()
    @IsNumber()
    public objectType: number;

    @IsOptional()
    @Expose()
    @IsString()
    public description: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
    public status: number;
}
