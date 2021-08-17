import { Arg, Args, ArgsType, ClassType, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { ParseHelper } from '../services/common';
import { GraphQLPaginationResponse } from '../types/query';
import { getRepository, Repository } from 'typeorm';
import { FullQuery } from '../controllers/requests';
import { plural } from 'pluralize';
import { ConditionQueryBuilder } from '../services/common/ConditionQueryBuilder';
import { ICrudOption } from '../services';
import { GraphQLJSONObject } from 'graphql-type-json';

@ArgsType()
export class ExtendedQuery extends FullQuery {
    @Field(() => GraphQLJSONObject, { nullable: true })
    public where: any;

    @Field(() => GraphQLJSONObject, { nullable: true })
    public order: any;
}

// tslint:disable-next-line:typedef
export function BaseResolver<T>(TClassFunc: () => ClassType<T>, name: string) {
    const TClass = TClassFunc();

    @ObjectType(`${TClass.name}PaginateResponse`)
    class PaginateResponse extends GraphQLPaginationResponse(TClass) {}

    @Service()
    @Resolver({ isAbstract: true })
    abstract class AbstractResolver {
        public readonly repository: Repository<T>;

        protected constructor(
            public readonly parseHelper: ParseHelper
        ) {
            this.repository = getRepository(TClass);
        }

        @Query(() => PaginateResponse, { name: plural(name) })
        public async findAll(@Args() query: ExtendedQuery): Promise<PaginateResponse> {
            const parsedQuery = this.parseHelper.fullQueryParam(query) as ICrudOption;
            const [list, count] = await ConditionQueryBuilder.ofRepository(this.repository)
                .select(undefined)
                .relations([])
                .take(parsedQuery.take)
                .skip(parsedQuery.skip)
                .condition(parsedQuery.where)
                .order(query.order)
                .search(query.search)
                .build()
                .getManyAndCount();
            return new PaginateResponse(query, { list, count });
        }

        @Query(() => TClass, { name })
        public async findOne(@Arg('id') id: string): Promise<T> {
            return await this.repository.findOne(id);
        }
    }

    return AbstractResolver;
}
