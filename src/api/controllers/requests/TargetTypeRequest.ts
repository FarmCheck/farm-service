
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

// class CreateTargetTypeBody extends BaseTargetType {}

export class UpdateTargetTypeBody {
    @Expose()
    @IsOptional()
    @IsString()
    public name: string;
}
