import { getConnection, QueryRunner } from 'typeorm';

export class TransactionService {
    public async InTransaction(): Promise<QueryRunner> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }
}
