import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';

@Exclude()
export class BaseSubCategory {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public categoryID: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
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
    @IsOptional()
    @IsString()
    public note: string;

    @Expose()
    @IsOptional()
    @IsDateString()
    public createdAt: string;
}

@Exclude()
export class SubCategoryResponse extends BaseSubCategory {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}

@Exclude()
export class SubCategoryBaseResponse {
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
    public code: string;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public urlThumbnail: string;
}
