"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class TransactionService {
    InTransaction() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const connection = typeorm_1.getConnection();
            const queryRunner = connection.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            return queryRunner;
        });
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transactionService.js.map