import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TransactionEntity } from 'shared/database/entities/transaction.entity'
import { SECURITY_PARKING_DB } from '@lib/common'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity], SECURITY_PARKING_DB),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}