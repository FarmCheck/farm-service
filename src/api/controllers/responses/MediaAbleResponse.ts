import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class BaseMediaAble {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public targetID: string;

    @Expose()
    @IsOptional()
    @IsString()
    public targetTypeID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public MediaID: string;
}

@Exclude()
export class MediaAbleResponse extends BaseMediaAble {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}
