import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { BaseSection } from '../responses';

export class CreateSectionBody extends BaseSection {
    @Exclude()
    @IsOptional()
    @IsString()
    public code: string;

    @Exclude()
    @IsOptional()
    @IsDateString()
    public createdAt: string;

    @Exclude()
    @IsNumber()
    @IsOptional()
    public diariesTotal: number;
}

export class UpdateSectionBody {
    // @Expose()
    // @IsOptional()
    // @IsUUID()
    // public productObjectID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public processID: string;

    @Expose()
    @IsOptional()
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
    @IsOptional()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Exclude()
    @IsNumber()
    @IsOptional()
    public diariesTotal: number;
}
