import { Interceptor, InterceptorInterface, Action } from 'routing-controllers';

@Interceptor()
export class ResponseInterceptor implements InterceptorInterface {

    public intercept(action: Action, content: any): any {
        if (content === undefined || content === null || content === []) {
            return undefined;
        }

        if (Object.keys(content).length === 0) {
            return { code: 200 };
        }

        return { code: 200, data: content};
    }
}
