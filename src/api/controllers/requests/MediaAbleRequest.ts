import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseMediaAble } from '../responses';

export class CreateMediaAbleBody extends BaseMediaAble {
    // product || farm || area || product_object
    @Expose()
    @IsNotEmpty()
    @IsString()
    public targetType: string;

    @Exclude()
    @IsOptional()
    @IsUUID()
    public targetTypeID: string;
}

export class UpdateMediaAbleBody {
    // product || farm
    @Expose()
    @IsOptional()
    @IsString()
    public targetType: string;

    @Exclude()
    @IsOptional()
    @IsUUID()
    public targetID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public MediaID: string;
}
