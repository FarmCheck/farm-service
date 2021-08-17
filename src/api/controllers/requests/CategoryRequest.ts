import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';
import { BaseCategory } from '../responses';

export class CreateCategoryBody extends BaseCategory {
    @Exclude()
    @IsDateString()
    @IsOptional()
    public createdAt: string;
}

export class UpdateCategoryBody {
    @Expose()
    @IsOptional()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
    public code: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public url: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public urlThumbnail: string;

    @Expose()
    @IsOptional()
    @IsString()
    public note: string;
}
