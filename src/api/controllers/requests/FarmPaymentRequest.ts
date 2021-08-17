import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

// class CreateFarmPaymentBody extends BaseFarmPayment {}

export class UpdateFarmPaymentBody {
    @Expose()
    @IsOptional()
    @IsUUID()
    public farmID: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    public type: number;

    @Expose()
    @IsOptional()
    @IsString()
    public provider: string;

    @Expose()
    @IsOptional()
    @IsString()
    public accountNo: string;

    @Expose()
    @IsOptional()
    @IsOptional()
    public expiredAt: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    public status: number;
}
