import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TransactionEntity } from 'shared/database/entities/transaction.entity'
import { Repository, Between } from 'typeorm'
import * as crypto from 'crypto'

import {
  DEFAULT_PAGINATE_LIMIT,
  SECURITY_PARKING_DB,
  ThrowError,
} from '@lib/common'
import { plainToInstance } from 'class-transformer'
import {
  CreateTransactionDto,
  ListTransactionsRequestDto,
  UpdateTransactionDto,
} from './transactions.dto'

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity, SECURITY_PARKING_DB)
    protected readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  private generateTransactionHash(
    userId: number,
    coinId: number,
    transactionType: string,
    quantity: string,
    price: string,
    timestamp: string,
  ): string {
    const data = `${userId}-${coinId}-${transactionType}-${quantity}-${price}-${timestamp}-${Date.now()}`
    return crypto.createHash('sha256').update(data).digest('hex')
  }

  async create(request: CreateTransactionDto, userId: number) {
    const transactionHash = this.generateTransactionHash(
      userId,
      request.coinId,
      request.transactionType,
      request.quantity,
      request.price,
      request.transactionTimestamp,
    )

    const existingTransaction = await this.transactionRepository.findOne({
      where: { transactionHash },
    })

    if (existingTransaction) {
      ThrowError('Transaction with this hash already exists')
    }

    const newTransaction = plainToInstance(
      TransactionEntity,
      {
        ...request,
        userId,
        transactionHash,
      },
      {
        ignoreDecorators: true,
      },
    )
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
      relations: ['coin'],
    })

    if (!transaction) {
      ThrowError('Transaction is NOT FOUND')
    }
    return transaction
  }

  async list(
    listTransactionsRequestDto: ListTransactionsRequestDto,
    userId: number,
  ) {
    const query: Record<string, any> = { userId }
    const {
      page,
      limit,
      transactionType,
      dateFrom,
      dateTo,
      coinId,
      transactionHash,
    } = listTransactionsRequestDto

    if (transactionType) {
      query['transactionType'] = transactionType
    }

    if (coinId) {
      query['coinId'] = coinId
    }

    if (transactionHash) {
      query['transactionHash'] = transactionHash
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
      relations: ['coin'],
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
    const transactionsWithHashes = transactions.map((transaction) => {
      const transactionHash = this.generateTransactionHash(
        userId,
        transaction.coinId,
        transaction.transactionType,
        transaction.quantity,
        transaction.price,
        transaction.transactionTimestamp,
      )

      return { transaction, transactionHash }
    })

    const existingHashes = await this.transactionRepository.find({
      where: transactionsWithHashes.map(({ transactionHash }) => ({
        transactionHash,
      })),
      select: ['transactionHash'],
    })

    const existingHashSet = new Set(
      existingHashes.map((tx) => tx.transactionHash),
    )
    const duplicateHashes = transactionsWithHashes.filter(
      ({ transactionHash }) => existingHashSet.has(transactionHash),
    )

    if (duplicateHashes.length > 0) {
      ThrowError(
        `${duplicateHashes.length} transactions with existing hashes found`,
      )
    }

    const newTransactions = transactionsWithHashes.map(
      ({ transaction, transactionHash }) =>
        plainToInstance(
          TransactionEntity,
          {
            ...transaction,
            userId,
            transactionHash,
          },
          {
            ignoreDecorators: true,
          },
        ),
    )
    return this.transactionRepository.save(newTransactions)
  }
}
