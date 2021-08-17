import { Exclude, Expose, Type } from 'class-transformer';
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    Min,
    ValidateNested
} from 'class-validator';
import { AreaBaseResponse, ProcessBaseResponse, ProductObjectBaseResponse } from './index';

@Exclude()
export class BaseSection {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public productObjectID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public processID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public areaID: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(1)
    public status: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    public type: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public createdAt: string;

    @Expose()
    @IsNumber()
    @IsOptional()
    public diariesTotal: number;
}

@Exclude()
export class SectionResponse extends BaseSection {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => AreaBaseResponse)
    public area: AreaBaseResponse;

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => ProcessBaseResponse)
    public process: ProcessBaseResponse;

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => ProductObjectBaseResponse)
    public productObject: ProductObjectBaseResponse;
}

@Exclude()
export class SectionDetailResponse extends BaseSection {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsString()
    public areaName: string;

    @Expose()
    @IsString()
    public productObjectName: string;

    @Expose()
    @IsString()
    public processName: string;

    @Expose()
    @IsString()
    public typeName: string;
}
