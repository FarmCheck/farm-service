"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataLoader = void 0;
const tslib_1 = require("tslib");
const dataloader_1 = tslib_1.__importDefault(require("dataloader"));
const typeorm_1 = require("typeorm");
// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------
tslib_1.__exportStar(require("./graphql-error-handling"), exports);
/**
 * Creates a new dataloader with the typorm repository
 */
function createDataLoader(obj, options = {}) {
    let repository;
    try {
        repository = typeorm_1.getCustomRepository(obj);
    }
    catch (errorRepo) {
        try {
            repository = typeorm_1.getRepository(obj);
        }
        catch (errorModel) {
            throw new Error('Could not create a dataloader, because obj is nether model or repository!');
        }
    }
    return new dataloader_1.default((ids) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        let items = [];
        if (options.method) {
            items = yield repository[options.method](ids);
        }
        else {
            items = yield repository.findByIds(ids);
        }
        const handleBatch = (arr) => options.multiple === true ? arr : arr[0];
        return ids.map(id => handleBatch(items.filter(item => item[options.key || 'id'] === id)));
    }));
}
exports.createDataLoader = createDataLoader;
//# sourceMappingURL=index.js.map