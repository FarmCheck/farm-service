import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { BaseProcess } from '../responses';

export class CreateProcessBody extends BaseProcess {
    @Exclude()
    @IsOptional()
    @IsString()
    public code: string;

    @Exclude()
    @IsOptional()
    @IsNumber()
    public productObjectsTotal: number;

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

export class UpdateProcessBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public farmID: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
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
    @Min(0)
    @Max(1)
    public status: number;
}
