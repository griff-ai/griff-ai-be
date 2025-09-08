import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PortfolioCoinEntity } from 'shared/database/entities/portfolio-coin.entity'
import { Repository } from 'typeorm'

import {
  DEFAULT_PAGINATE_LIMIT,
  SECURITY_PARKING_DB,
  ThrowError,
} from '@lib/common'
import { plainToInstance } from 'class-transformer'
import { CreatePortfolioCoinDto, ListPortfolioCoinsRequestDto, UpdatePortfolioCoinDto } from './portfolio-coins.dto'

@Injectable()
export class PortfolioCoinsService {
  constructor(
    @InjectRepository(PortfolioCoinEntity, SECURITY_PARKING_DB)
    protected readonly portfolioCoinRepository: Repository<PortfolioCoinEntity>,
  ) {}

  async create(request: CreatePortfolioCoinDto, userId: number) {
    const existingPortfolioCoin = await this.portfolioCoinRepository.findOne({
      where: { userId, coinId: request.coinId },
    })

    if (existingPortfolioCoin) {
      ThrowError('Portfolio coin already exists for this user')
    }

    const newPortfolioCoin = plainToInstance(PortfolioCoinEntity, {
      ...request,
      userId,
    }, {
      ignoreDecorators: true,
    })
    return this.portfolioCoinRepository.save(newPortfolioCoin)
  }

  async update(id: string, request: UpdatePortfolioCoinDto, userId: number) {
    const portfolioCoin = await this.portfolioCoinRepository.findOne({
      where: { id: parseInt(id), userId },
    })

    if (!portfolioCoin) {
      ThrowError('Portfolio coin is NOT FOUND')
    }

    Object.assign(portfolioCoin, request)
    return this.portfolioCoinRepository.save(portfolioCoin)
  }

  async findOne(id: string, userId: number) {
    const portfolioCoin = await this.portfolioCoinRepository.findOne({
      where: { id: parseInt(id), userId },
    })

    if (!portfolioCoin) {
      ThrowError('Portfolio coin is NOT FOUND')
    }
    return portfolioCoin
  }

  async findByCoinId(coinId: number, userId: number) {
    return this.portfolioCoinRepository.findOne({
      where: { coinId, userId },
    })
  }

  async list(listPortfolioCoinsRequestDto: ListPortfolioCoinsRequestDto, userId: number) {
    const query: Record<string, any> = { userId }
    const {
      page,
      limit,
      coinId,
    } = listPortfolioCoinsRequestDto

    if (coinId) {
      query['coinId'] = coinId
    }

    const order: Record<string, any> = {
      totalMarketValue: 'DESC',
      createdAt: 'DESC',
    }

    const pageQuery = page || 1
    const takeQuery = limit || DEFAULT_PAGINATE_LIMIT
    const result = await this.portfolioCoinRepository.findAndCount({
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
    const portfolioCoin = await this.portfolioCoinRepository.findOne({
      where: { id: parseInt(id), userId },
    })

    if (!portfolioCoin) {
      ThrowError('Portfolio coin is NOT FOUND')
    }
    return this.portfolioCoinRepository.delete({ id: parseInt(id), userId })
  }

  async bulkUpsert(portfolioCoins: CreatePortfolioCoinDto[], userId: number) {
    const portfolioCoinsWithUserId = portfolioCoins.map(coin => ({
      ...coin,
      userId,
    }))
    return this.portfolioCoinRepository.upsert(portfolioCoinsWithUserId, ['userId', 'coinId'])
  }
}