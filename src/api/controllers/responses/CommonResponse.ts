import { IsNumber, IsString } from 'class-validator';

export class ErrorResponse {
    @IsNumber()
    public code: number;

    @IsString()
    public message: string;
}
