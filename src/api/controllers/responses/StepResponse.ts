import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { StepPropertyResponse } from './index';

@Exclude()
export class BaseStep {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public processID: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isInternal: boolean;

    @Expose()
    @IsOptional()
    @IsString()
    public description: string;

    @Expose()
    @IsNumber()
    @JSONSchema({ description: 'order in process' })
    public order: number;

    @Expose()
    @IsNumber()
    public diariesTotal: number;
}

@Exclude()
export class StepResponse extends BaseStep {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}

@Expose()
export class StepDetailResponse extends BaseStep {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => StepPropertyResponse)
    public stepProperties: StepPropertyResponse[];
}
