/**
 * TODO: Move all response below to specific files
 */

import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

@Exclude()
export class DiaryPortalResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

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
    @IsArray()
    @IsString({each: true})
    public urls: string[];

    @Expose()
    @IsOptional()
    @IsDateString()
    public createdAt: string;

    @Expose()
    @IsBoolean()
    @IsOptional()
    public isVerified: boolean;
}

@Exclude()
export class ProcessPortalResponse {
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
    public status: number;

    @Expose()
    @IsDateString()
    @IsOptional()
    public createdAt: string;

    @Expose()
    @IsDateString()
    @IsOptional()
    public updatedAt: string;
}

@Exclude()
export class StepPortalResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public processID: string;

    @Expose()
    @IsNumber()
    @JSONSchema({ description: 'order in process' })
    public order: number;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => DiaryPortalResponse)
    public diaries: DiaryPortalResponse[];

    @Expose()
    @IsNumber()
    public diariesTotal: number;
}

@Exclude()
export class SectionPortalResponse {
    @Expose()
    @IsUUID()
    public id: string;

    @Expose()
    @IsString()
    public name: string;

    @Expose()
    @IsNumber()
    public type: number;

    @Expose()
    @IsString()
    public code: string;

    @Expose()
    @IsNumber()
    public diariesTotal: number;

    @Expose()
    @IsDateString()
    public createdAt: string;
}

@Exclude()
export class DiariesPortalResponse {
    @Expose()
    @Type(() => ProcessPortalResponse)
    @ValidateNested()
    public process: ProcessPortalResponse;

    @Expose()
    @IsArray()
    @Type(() => StepPortalResponse)
    @ValidateNested({ each: true })
    public steps: StepPortalResponse[];

    @Expose()
    @Type(() => SectionPortalResponse)
    @ValidateNested()
    public section: SectionPortalResponse;

    constructor(data: Partial<DiariesPortalResponse>) {
        Object.assign(this, data);
    }
}
