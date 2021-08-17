import { Exclude, Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID, Max,
    Min,
    ValidateNested
} from 'class-validator';
import { AreaBaseResponse, MediaBaseResponse, ProcessBaseResponse, ProductBaseResponse, SectionDetailResponse } from './index';
import { ProductPortalResponse } from './index';

@Exclude()
export class BaseProductObject {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public productID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public processID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public areaID: string;

    @IsOptional()
    @Expose()
    @IsString()
    public code: string;

    @Expose()
    @IsNotEmpty()
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
export class ProductObjectResponse extends BaseProductObject {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];

    @Expose()
    @IsObject()
    @ValidateNested()
    @Type(() => AreaBaseResponse)
    public area: AreaBaseResponse;
}

@Exclude()
export class ProductObjectBaseResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public processID: string;

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
    public status: number;
}

@Exclude()
export class ProductObjectDetailResponse extends BaseProductObject {
    @IsNotEmpty()
    @IsUUID()
    @Expose()
    public id: string;

    @IsOptional()
    @Expose()
    @IsString()
    public code: string;

    @Expose()
    @IsNotEmpty()
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

    @Expose()
    @IsDateString()
    @IsOptional()
    public createdAt: string;

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
    @Type(() => ProductBaseResponse)
    public product: ProductBaseResponse;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => SectionDetailResponse)
    public sections: SectionDetailResponse[];

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];
}

@Exclude()
export class ProductObjectPortalResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @IsOptional()
    @Expose()
    @IsString()
    public code: string;

    @Expose()
    @IsNotEmpty()
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

    @Expose()
    @IsDateString()
    @IsOptional()
    public createdAt: string;

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
    @Type(() => ProductPortalResponse)
    public product: ProductPortalResponse;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MediaBaseResponse)
    public medias: MediaBaseResponse[];
}
