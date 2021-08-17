import { Exclude, Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID, Max, Min,
    ValidateNested
} from 'class-validator';
import { StepDetailResponse } from './index';

@Exclude()
export class BaseProcess {
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
    public quantity: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isHaveStep: boolean;

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
export class ProcessResponse extends BaseProcess {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => StepDetailResponse)
    public steps: StepDetailResponse[];
}

@Exclude()
export class ProcessBaseResponse {
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
export class ProcessDetailResponse extends BaseProcess {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => StepDetailResponse)
    public steps: StepDetailResponse[];
}
