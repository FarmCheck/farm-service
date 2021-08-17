import { InterceptorInterface, Action } from 'routing-controllers';

export class ListResponseInterceptor implements InterceptorInterface {

    public intercept(action: Action, content: any): any {
        if (content === undefined || content === null || content === []) {
            return undefined;
        }

        const option = action.request.query;

        let page = 1;

        if (option.page && option.take) {
            page = option.page;
        } else if (option.skip && option.take) {
            page = Math.floor(option.skip / option.take) + 1;
        }

        return {
            ...content,
            data: content.data.list,
            pagination: {
                current: page,
                next: page + 1,
                prev: page - 1,
                take: option.take,
                total: content.data.count,
            },
        };
    }
}
