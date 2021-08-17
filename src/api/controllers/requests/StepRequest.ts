import { IsArray, IsBoolean, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { CreateStepPropertyBody } from './index';
import { BaseStep } from '../responses';

// 0: 'text', 1: 'number', 2: 'link'
export class CreateStepBody extends BaseStep {
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateStepPropertyBody)
    public stepProperties: CreateStepPropertyBody[];

    @Exclude()
    @IsNumber()
    @IsOptional()
    public diariesTotal: number;
}

export class UpdateStepBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public processID: string;

    @Expose()
    @IsOptional()
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

    @Exclude()
    @IsNumber()
    @IsOptional()
    public diariesTotal: number;
}
