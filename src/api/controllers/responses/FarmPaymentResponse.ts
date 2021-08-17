import { Exclude, Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class BaseFarmPayment {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public farmID: string;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    public type: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public provider: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    public accountNo: string;

    @Expose()
    @IsNotEmpty()
    @IsDateString()
    public expiredAt: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    public status: number;

    @Expose()
    @IsDateString()
    @IsOptional()
    public createdAt: string;

    @Expose()
    @IsDateString()
    @IsOptional()
    public updatedAt: string;

    @Expose()
    @IsDateString()
    @IsOptional()
    public deletedAt: string;
}

@Exclude()
export class FarmPaymentResponse extends BaseFarmPayment {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    public id: string;
}
