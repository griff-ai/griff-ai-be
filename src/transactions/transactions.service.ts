import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TransactionEntity } from 'shared/database/entities/transaction.entity'
import { Repository, Between } from 'typeorm'

import {
  DEFAULT_PAGINATE_LIMIT,
  SECURITY_PARKING_DB,
  ThrowError,
} from '@lib/common'
import { plainToInstance } from 'class-transformer'
import { CreateTransactionDto, ListTransactionsRequestDto, UpdateTransactionDto } from './transactions.dto'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity, SECURITY_PARKING_DB)
    protected readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async create(request: CreateTransactionDto, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: request.id },
    })

    if (transaction) {
      ThrowError('Transaction already exists')
    }

    const newTransaction = plainToInstance(TransactionEntity, {
      ...request,
      userId,
    }, {
      ignoreDecorators: true,
    })
    return this.transactionRepository.save(newTransaction)
  }

  async update(id: string, request: UpdateTransactionDto, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: parseInt(id), userId },
    })

    if (!transaction) {
      ThrowError('Transaction is NOT FOUND')
    }

    Object.assign(transaction, request)
    return this.transactionRepository.save(transaction)
  }

  async findOne(id: string, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: parseInt(id), userId },
    })

    if (!transaction) {
      ThrowError('Transaction is NOT FOUND')
    }
    return transaction
  }

  async list(listTransactionsRequestDto: ListTransactionsRequestDto, userId: number) {
    const query: Record<string, any> = { userId }
    const {
      page,
      limit,
      transactionType,
      dateFrom,
      dateTo,
    } = listTransactionsRequestDto

    if (transactionType) {
      query['transactionType'] = transactionType
    }

    if (dateFrom || dateTo) {
      const fromDate = dateFrom ? new Date(dateFrom) : new Date('1970-01-01')
      const toDate = dateTo ? new Date(dateTo) : new Date()
      query['transactionTimestamp'] = Between(fromDate, toDate)
    }

    const order: Record<string, any> = {
      transactionTimestamp: 'DESC',
    }

    const pageQuery = page || 1
    const takeQuery = limit || DEFAULT_PAGINATE_LIMIT
    const result = await this.transactionRepository.findAndCount({
      where: query,
      order,
      skip: (+pageQuery - 1) * takeQuery,
      take: +takeQuery,
    })

    return {
      data: result[0],
      pagination: {
        total: result[1],
        limit: takeQuery,
        page: pageQuery,
      },
    }
  }

  async delete(id: string, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: parseInt(id), userId },
    })

    if (!transaction) {
      ThrowError('Transaction is NOT FOUND')
    }
    return this.transactionRepository.delete({ id: parseInt(id), userId })
  }

  async bulkCreate(transactions: CreateTransactionDto[], userId: number) {
    const newTransactions = transactions.map(transaction => 
      plainToInstance(TransactionEntity, {
        ...transaction,
        userId,
      }, {
        ignoreDecorators: true,
      })
    )
    return this.transactionRepository.save(newTransactions)
  }
}