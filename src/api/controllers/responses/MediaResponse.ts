import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsUrl, IsUUID } from 'class-validator';

@Exclude()
export class BaseMedia {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public type: number;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public url: string;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public urlThumbnail: string;

    @Expose()
    @IsDateString()
    @IsOptional()
    public createdAt: string;
}

@Exclude()
export class MediaResponse extends BaseMedia {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}

@Exclude()
export class MediaBaseResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public urlThumbnail: string;

    @Expose()
    @IsNotEmpty()
    @IsUrl()
    public url: string;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public type: number;
}
