"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListResponseInterceptor = void 0;
class ListResponseInterceptor {
    intercept(action, content) {
        if (content === undefined || content === null || content === []) {
            return undefined;
        }
        const option = action.request.query;
        let page = 1;
        if (option.skip && option.take) {
            page = Math.floor(option.skip / option.take) + 1;
        }
        return Object.assign(Object.assign({}, content), { data: content.data.list, pagination: {
                current: page,
                next: page + 1,
                prev: page - 1,
                take: option.take,
                total: content.data.count,
            } });
    }
}
exports.ListResponseInterceptor = ListResponseInterceptor;
//# sourceMappingURL=ListResponseInterceptor.js.map