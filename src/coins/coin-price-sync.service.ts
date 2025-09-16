import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { HttpService } from '@nestjs/axios'
import { CoinsService } from './coins.service'
import { CreateCoinDto } from './coins.dto'
import { firstValueFrom } from 'rxjs'

interface CoinGeckoMarketData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  last_updated: string
}

@Injectable()
export class CoinPriceSyncService {
  private readonly logger = new Logger(CoinPriceSyncService.name)
  private readonly COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

  constructor(
    private readonly httpService: HttpService,
    private readonly coinsService: CoinsService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async syncCoinPrices() {
    this.logger.log('Starting coin price sync from CoinGecko...')

    try {
      const coins = await this.fetchTopCoins(250)
      const coinDtos = this.mapCoinGeckoToDto(coins)

      await this.coinsService.bulkUpsertBySlug(coinDtos)

      this.logger.log(`Successfully synced ${coinDtos.length} coins`)
    } catch (error) {
      this.logger.error('Failed to sync coin prices', error)
    }
  }

  async fetchTopCoins(limit: number = 250): Promise<CoinGeckoMarketData[]> {
    const url = `${this.COINGECKO_API_BASE}/coins/markets`
    const params = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: limit.toString(),
      page: '1',
      sparkline: 'false',
      locale: 'en',
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get<CoinGeckoMarketData[]>(url, { params }),
      )

      this.logger.log(`Fetched ${response.data.length} coins from CoinGecko`)
      return response.data
    } catch (error) {
      this.logger.error('Failed to fetch coins from CoinGecko', error)
      throw error
    }
  }

  private mapCoinGeckoToDto(
    coins: CoinGeckoMarketData[],
  ): Omit<CreateCoinDto, 'id'>[] {
    return coins.map((coin) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      slug: coin.id, // CoinGecko ID becomes our slug
      imageUrl: coin.image,
      currentPrice: coin.current_price?.toString() || '0',
      marketCap: coin.market_cap?.toString() || '0',
      marketCapRank: coin.market_cap_rank || null,
      totalVolume: coin.total_volume?.toString() || '0',
      circulatingSupply: coin.circulating_supply?.toString() || '0',
      totalSupply: coin.total_supply?.toString() || null,
      maxSupply: coin.max_supply?.toString() || null,
      priceChange24h: coin.price_change_24h?.toString() || '0',
      priceChangePercentage24h:
        coin.price_change_percentage_24h?.toString() || '0',
      lastUpdated: new Date(coin.last_updated),
    }))
  }

  // Manual trigger for testing
  async syncNow(): Promise<void> {
    await this.syncCoinPrices()
  }
}
