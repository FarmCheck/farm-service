import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';
import { BaseDiary } from '../responses';

export class CreateDiaryBody extends BaseDiary {
    @Expose()
    @IsOptional()
    @IsUUID()
    public productObjectID: string;

    @Exclude()
    @IsOptional()
    @IsDateString()
    public createdAt: string;
}

export class UpdateDiaryBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public stepID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public sectionID: string;

    @Expose()
    @IsOptional()
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
}
