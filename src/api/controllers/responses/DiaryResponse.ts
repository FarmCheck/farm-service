import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class BaseDiary {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public stepID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public sectionID: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
    public description: string;

    @Expose()
    @IsArray()
    @IsOptional()
    @IsString({each: true})
    public urls: string[];

    @Expose()
    @IsBoolean()
    @IsOptional()
    public isVerified: boolean;

    @Expose()
    @IsOptional()
    @IsDateString()
    public createdAt: string;
}

@Exclude()
export class DiaryResponse extends BaseDiary {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}

@Exclude()
export class DiaryBaseResponse {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public sectionID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public stepID: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;

    @Expose()
    @IsOptional()
    @IsString()
    public description: string;

    @Expose()
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    public urls: string[];

    @Expose()
    @IsOptional()
    @IsDateString()
    public createdAt: string;

    @Expose()
    @IsBoolean()
    @IsOptional()
    public isVerified: boolean;
}
