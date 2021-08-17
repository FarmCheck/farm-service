import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

export class PaginationQuery {
    @IsNumber()
    public limit: number;

    @IsNumber()
    public offset?: number;
}

@ArgsType()
export class BaseQuery {
    @IsNumber()
    @IsOptional()
    @Field()
    public type: number;

    @IsString()
    @IsOptional()
    @Field({ description: 'Where condition in JSON String', defaultValue: '' })
    public where: string;

    @IsString()
    @IsOptional()
    public select: string;

    @IsString()
    @IsOptional()
    public relations: string;
}

@ArgsType()
export class FullQuery extends BaseQuery {
    @IsNumber()
    @IsOptional()
    @Field()
    public page: number;

    @IsNumber()
    @IsOptional()
    @Field()
    public take: number;

    @IsNumber()
    @IsOptional()
    @Field()
    public skip: number;

    @IsString()
    @IsOptional()
    @Field({ nullable: true })
    public search: string;

    @IsString()
    @IsOptional()
    @Field({ nullable: true, description: 'Sort condition in JSON string' })
    public order: string;
}
