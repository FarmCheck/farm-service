import { ClassType, Field, Int, ObjectType } from 'type-graphql';
import { CListData } from '../../services';
import { FullQuery } from '../../controllers/requests';

@ObjectType()
class PaginationInfo {
    @Field(() => Int)
    public take: number;
    @Field(() => Int)
    public total: number;
    @Field(() => Int)
    public totalPage: number;
    @Field(() => Int)
    public current: number;
    @Field(() => Int)
    public next: number;
    @Field(() => Int)
    public prev: number;

    constructor(data: Partial<PaginationInfo>) {
        Object.assign(this, data);
    }
}

// tslint:disable-next-line: typedef
export function GraphQLPaginationResponse<T>(TClass: ClassType<T>) {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected,JSMismatchedCollectionQueryUpdate
    @ObjectType({ isAbstract: true })
    abstract class BaseGraphQLPaginationResponse {
        @Field(() => [TClass])
        public data: T[];

        @Field(() => PaginationInfo)
        public pagination: PaginationInfo;

        constructor(ctx: FullQuery, listData: CListData<T>) {
            this.data = listData.list;
            const take = Math.max(ctx.take, 1);
            const totalPage = Math.ceil(listData.count / take);
            this.pagination = new PaginationInfo({
                total: listData.count,
                totalPage,
                prev: Math.max(ctx.page - 1, 1),
                next: Math.min(ctx.page + 1, totalPage),
                current: ctx.page,
                take,
            });
        }
    }

    return BaseGraphQLPaginationResponse;
}
