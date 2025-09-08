import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PortfolioEntity } from 'shared/database/entities/portfolio.entity'
import { Repository } from 'typeorm'

import {
  DEFAULT_PAGINATE_LIMIT,
  SECURITY_PARKING_DB,
  ThrowError,
} from '@lib/common'
import { plainToInstance } from 'class-transformer'
import { CreatePortfolioDto, ListPortfoliosRequestDto, UpdatePortfolioDto } from './portfolios.dto'

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(PortfolioEntity, SECURITY_PARKING_DB)
    protected readonly portfolioRepository: Repository<PortfolioEntity>,
  ) {}

  async create(request: CreatePortfolioDto) {
    const newPortfolio = plainToInstance(PortfolioEntity, request, {
      ignoreDecorators: true,
    })
    return this.portfolioRepository.save(newPortfolio)
  }

  async update(id: string, request: UpdatePortfolioDto) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!portfolio) {
      ThrowError('Portfolio is NOT FOUND')
    }

    Object.assign(portfolio, request)
    return this.portfolioRepository.save(portfolio)
  }

  async findOne(id: string) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!portfolio) {
      ThrowError('Portfolio is NOT FOUND')
    }
    return portfolio
  }

  async findByUserId(userId: number) {
    return this.portfolioRepository.findOne({
      where: { userId },
    })
  }

  async getPortfolioOverview(userId: number) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { userId },
    })

    if (!portfolio) {
      return {
        totalHoldingsValue: '0.0',
        totalCost: '0.0',
        pastHoldingsValue: '0.0',
        holdingsChange: '0.0',
        holdingsChangePercentage: '0.0',
        profitLoss: '0.0',
        hasInactiveCoins: false,
        profitLossChangePercentage: '0.0',
        topGainerPageUrl: null,
        topGainerImageUrl: null,
        topGainerName: null,
        topGainerSymbol: null,
        topGainerProfitLoss: null,
      }
    }

    return portfolio
  }

  async list(listPortfoliosRequestDto: ListPortfoliosRequestDto) {
    const query: Record<string, any> = {}
    const {
      page,
      limit,
      userId,
    } = listPortfoliosRequestDto

    if (userId) {
      query['userId'] = userId
    }

    const order: Record<string, any> = {
      createdAt: 'DESC',
    }

    const pageQuery = page || 1
    const takeQuery = limit || DEFAULT_PAGINATE_LIMIT
    const result = await this.portfolioRepository.findAndCount({
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

  async delete(id: string) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!portfolio) {
      ThrowError('Portfolio is NOT FOUND')
    }
    return this.portfolioRepository.delete(parseInt(id))
  }

  async upsertPortfolio(portfolioData: CreatePortfolioDto) {
    return this.portfolioRepository.upsert(portfolioData, ['userId'])
  }
}