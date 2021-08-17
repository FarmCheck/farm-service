import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID, ValidateNested } from 'class-validator';
import { SubCategoryBaseResponse } from './index';

@Exclude()
export class BaseCategory {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsString()
    @IsOptional()
    public code: string;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public url: string;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public urlThumbnail: string;

    @Expose()
    @IsString()
    @IsOptional()
    public note: string;

    @Expose()
    @IsDateString()
    @IsOptional()
    public createdAt: string;
}

@Exclude()
export class CategoryResponse extends BaseCategory {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => SubCategoryBaseResponse)
    public subCategories: SubCategoryBaseResponse[];
}
