import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsUUID, Max, Min } from 'class-validator';
import { BaseMedia } from '../responses';

export class CreateMediaBody extends BaseMedia {
    // product || farm || area || product_object
    @Expose()
    @IsNotEmpty()
    @IsString()
    public targetType: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public targetID: string;

    @Exclude()
    @IsDateString()
    @IsOptional()
    public createdAt: string;
}

export class CreateMediaBaseBody {
    // 0: image, 1: video, 2: document
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(2)
    public type: number;

    @IsNotEmpty()
    @IsUrl()
    public url: string;

    @IsNotEmpty()
    @IsUrl()
    public urlThumbnail: string;
}

export class UpdateMediaBody {
    @Expose()
    @IsOptional()
    @IsNumber()
    public type: number;

    @Expose()
    @IsOptional()
    @IsUrl()
    public url: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    public urlThumbnail: string;
}
