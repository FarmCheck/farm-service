import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class BaseStepProperty {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public stepID: string;

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

@Exclude()
export class StepPropertyResponse extends BaseStepProperty {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}
