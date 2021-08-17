import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@Exclude()
export class BaseTargetType {
    @Expose()
    @IsNotEmpty()
    @IsString()
    public name: string;
}

@Exclude()
export class TargetTypeResponse extends BaseTargetType {
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}
