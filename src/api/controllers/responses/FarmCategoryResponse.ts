import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Exclude()
export class BaseFarmCategory {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public farmID: string;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public categoryID: string;
}

@Exclude()
export class FarmCategoryResponse extends BaseFarmCategory {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}
