import { Action } from 'routing-controllers';
import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';

/**
 * **Global Interceptor** will run before **Function Interceptor**
 *
 * So I assume that content will be like `{ code: 200, data: any }`
 *
 * We will format content.data
 */
// TODO: bugs if object is undefined
export function ClassTransformerInterceptor<T = any>(cls: ClassConstructor<T>, opts: ClassTransformOptions = {}): any {
    return (action: Action, content: any): any => {
        const mergeOptions: ClassTransformOptions = {
            strategy: 'excludeAll',
            ...opts,
        };
        const { data, ...rest } = content;
        const newData = plainToClass(cls, data, mergeOptions);
        return {
            ...rest,
            data: newData,
        };
    };
}
