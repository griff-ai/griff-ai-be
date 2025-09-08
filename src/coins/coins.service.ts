import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CoinEntity } from 'shared/database/entities/coin.entity'
import { Like, Repository } from 'typeorm'

import {
  DEFAULT_PAGINATE_LIMIT,
  SECURITY_PARKING_DB,
  ThrowError,
} from '@lib/common'
import { plainToInstance } from 'class-transformer'
import { CreateCoinDto, ListCoinsRequestDto, UpdateCoinDto } from './coins.dto'

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(CoinEntity, SECURITY_PARKING_DB)
    protected readonly coinRepository: Repository<CoinEntity>,
  ) {}

  async create(request: CreateCoinDto) {
    const coin = await this.coinRepository.findOne({
      where: { id: request.id },
    })

    if (coin) {
      ThrowError('Coin already exists')
    }

    const newCoin = plainToInstance(CoinEntity, request, {
      ignoreDecorators: true,
    })
    return this.coinRepository.save(newCoin)
  }

  async update(id: string, request: UpdateCoinDto) {
    const coin = await this.coinRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!coin) {
      ThrowError('Coin is NOT FOUND')
    }

    Object.assign(coin, request)
    return this.coinRepository.save(coin)
  }

  async findOne(id: string) {
    const coin = await this.coinRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!coin) {
      ThrowError('Coin is NOT FOUND')
    }
    return coin
  }

  async findBySlug(slug: string) {
    return this.coinRepository.findOne({
      where: { slug },
    })
  }

  async list(listCoinsRequestDto: ListCoinsRequestDto) {
    const query: Record<string, any> = {}
    const {
      page,
      limit,
      symbol,
      name,
      slug,
    } = listCoinsRequestDto

    if (symbol) {
      query['symbol'] = Like(`%${symbol}%`)
    }

    if (name) {
      query['name'] = Like(`%${name}%`)
    }

    if (slug) {
      query['slug'] = Like(`%${slug}%`)
    }

    const order: Record<string, any> = {
      marketCapRank: 'ASC',
      createdAt: 'DESC',
    }

    const pageQuery = page || 1
    const takeQuery = limit || DEFAULT_PAGINATE_LIMIT
    const result = await this.coinRepository.findAndCount({
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
    const coin = await this.coinRepository.findOne({
      where: { id: parseInt(id) },
    })

    if (!coin) {
      ThrowError('Coin is NOT FOUND')
    }
    return this.coinRepository.delete(parseInt(id))
  }

  async bulkUpsert(coins: CreateCoinDto[]) {
    return this.coinRepository.upsert(coins, ['id'])
  }
}