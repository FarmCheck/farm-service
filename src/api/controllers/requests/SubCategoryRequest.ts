import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import { BaseSubCategory } from '../responses';

export class CreateSubCategoryBody extends BaseSubCategory {
    @Exclude()
    @IsDateString()
    @IsOptional()
    public createdAt: string;
}

export class UpdateSubCategoryBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public categoryID: string;

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
