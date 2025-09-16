import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Cron, CronExpression } from '@nestjs/schedule'
import { TransactionEntity } from 'shared/database/entities/transaction.entity'
import { PortfolioCoinEntity } from 'shared/database/entities/portfolio-coin.entity'
import { CoinEntity } from 'shared/database/entities/coin.entity'
import { GRIFF_AI_DB } from '@lib/common'
import { TransactionType } from 'src/transactions/transactions.dto'

interface CoinHolding {
  coinId: number
  totalQuantity: number
  totalCost: number
  averagePrice: number
  totalMarketValue: number
  profitLoss: number
  profitLossChange: number
}

@Injectable()
export class PortfolioCalculationService {
  private readonly logger = new Logger(PortfolioCalculationService.name)

  constructor(
    @InjectRepository(TransactionEntity, GRIFF_AI_DB)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(PortfolioCoinEntity, GRIFF_AI_DB)
    private readonly portfolioCoinRepository: Repository<PortfolioCoinEntity>,
    @InjectRepository(CoinEntity, GRIFF_AI_DB)
    private readonly coinRepository: Repository<CoinEntity>,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async updateAllPortfolios() {
    this.logger.log('Starting portfolio calculation update...')
    
    try {
      // Get all unique users who have transactions
      const users = await this.transactionRepository
        .createQueryBuilder('transaction')
        .select('DISTINCT transaction.userId', 'userId')
        .getRawMany()

      for (const user of users) {
        await this.calculateUserPortfolio(user.userId)
      }

      this.logger.log(`Successfully updated portfolios for ${users.length} users`)
    } catch (error) {
      this.logger.error('Failed to update portfolios', error)
    }
  }

  async calculateUserPortfolio(userId: number): Promise<void> {
    this.logger.log(`Calculating portfolio for user ${userId}`)

    // Get all transactions for user
    const transactions = await this.transactionRepository.find({
      where: { userId },
      relations: ['coin'],
      order: { transactionTimestamp: 'ASC' },
    })

    // Group transactions by coin and calculate holdings
    const coinHoldings = this.aggregateTransactionsByCoin(transactions)

    // Update or create portfolio coin records
    for (const [coinId, holding] of coinHoldings) {
      await this.upsertPortfolioCoin(userId, coinId, holding)
    }

    // Remove portfolio coins with zero holdings
    await this.cleanupZeroHoldings(userId, Array.from(coinHoldings.keys()))
  }

  private aggregateTransactionsByCoin(transactions: TransactionEntity[]): Map<number, CoinHolding> {
    const holdings = new Map<number, CoinHolding>()

    for (const transaction of transactions) {
      const coinId = transaction.coinId
      const quantity = parseFloat(transaction.quantity)
      const price = parseFloat(transaction.price)
      const cost = parseFloat(transaction.cost)
      const fees = parseFloat(transaction.fees || '0')

      if (!holdings.has(coinId)) {
        holdings.set(coinId, {
          coinId,
          totalQuantity: 0,
          totalCost: 0,
          averagePrice: 0,
          totalMarketValue: 0,
          profitLoss: 0,
          profitLossChange: 0,
        })
      }

      const holding = holdings.get(coinId)!

      switch (transaction.transactionType) {
        case TransactionType.BUY:
          holding.totalQuantity += quantity
          holding.totalCost += cost + fees
          break

        case TransactionType.SELL:
          holding.totalQuantity -= quantity
          // Reduce cost proportionally
          if (holding.totalQuantity > 0) {
            const costReduction = (quantity / (holding.totalQuantity + quantity)) * holding.totalCost
            holding.totalCost -= costReduction
          } else {
            holding.totalCost = 0
          }
          break

        case TransactionType.TRANSFER:
          // For transfers, we just adjust quantity (assuming no cost change)
          holding.totalQuantity += quantity
          break
      }

      // Calculate average price
      if (holding.totalQuantity > 0 && holding.totalCost > 0) {
        holding.averagePrice = holding.totalCost / holding.totalQuantity
      }

      // Get current market price and calculate market value
      if (transaction.coin?.currentPrice) {
        const currentPrice = parseFloat(transaction.coin.currentPrice)
        holding.totalMarketValue = holding.totalQuantity * currentPrice
        holding.profitLoss = holding.totalMarketValue - holding.totalCost
        
        if (holding.totalCost > 0) {
          holding.profitLossChange = (holding.profitLoss / holding.totalCost) * 100
        }
      }
    }

    return holdings
  }

  private async upsertPortfolioCoin(userId: number, coinId: number, holding: CoinHolding): Promise<void> {
    // Skip coins with zero or negative holdings
    if (holding.totalQuantity <= 0) {
      return
    }

    const existingPortfolioCoin = await this.portfolioCoinRepository.findOne({
      where: { userId, coinId },
    })

    const portfolioData = {
      userId,
      coinId,
      totalHoldings: holding.totalQuantity.toFixed(10),
      totalCost: holding.totalCost.toFixed(10),
      totalMarketValue: holding.totalMarketValue.toFixed(10),
      averageNetCost: holding.averagePrice.toFixed(10),
      profitLoss: holding.profitLoss.toFixed(10),
      profitLossChange: holding.profitLossChange.toFixed(4),
    }

    if (existingPortfolioCoin) {
      // Update existing record
      Object.assign(existingPortfolioCoin, portfolioData)
      await this.portfolioCoinRepository.save(existingPortfolioCoin)
    } else {
      // Create new record
      const newPortfolioCoin = this.portfolioCoinRepository.create(portfolioData)
      await this.portfolioCoinRepository.save(newPortfolioCoin)
    }

    this.logger.debug(`Updated portfolio coin for user ${userId}, coin ${coinId}: ${holding.totalQuantity} units`)
  }

  private async cleanupZeroHoldings(userId: number, activeCoinIds: number[]): Promise<void> {
    // Remove portfolio coins that are not in the active coins list or have zero holdings
    await this.portfolioCoinRepository
      .createQueryBuilder()
      .delete()
      .where('user_id = :userId', { userId })
      .andWhere(activeCoinIds.length > 0 ? 'coin_id NOT IN (:...activeCoinIds)' : '1=1', { activeCoinIds })
      .orWhere('total_holdings <= 0')
      .execute()
  }

  // Manual trigger for testing or immediate update
  async calculatePortfolioNow(userId: number): Promise<void> {
    await this.calculateUserPortfolio(userId)
  }

  // Calculate portfolio for all users manually
  async calculateAllPortfoliosNow(): Promise<void> {
    await this.updateAllPortfolios()
  }
}