import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateFarmCategoryBody {
    // @Expose()
    // @IsOptional()
    // @IsUUID()
    // public farmID: string;

    @Expose()
    @IsOptional()
    @IsUUID()
    public categoryID: string;
}
