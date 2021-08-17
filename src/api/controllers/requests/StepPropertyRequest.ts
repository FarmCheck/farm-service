import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateStepPropertyBody {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isRequired: boolean;

    @Expose()
    @IsOptional()
    @IsNumber()
    public type: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public value: string;
}

export class UpdateStepPropertyBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public stepID: string;

    @Expose()
    @IsOptional()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsBoolean()
    public isRequired: boolean;

    @Expose()
    @IsOptional()
    @IsNumber()
    public type: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public value: string;
}
