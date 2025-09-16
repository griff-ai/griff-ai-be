import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthAdminGuard, ItemResponseInterceptor } from '@lib/common'
import { ListResponseInterceptor } from '@lib/common/interceptors/list-response.interceptor'
import { CoinsService } from './coins.service'
import { CoinPriceSyncService } from './coin-price-sync.service'
import { CreateCoinDto, ListCoinsRequestDto, UpdateCoinDto } from './coins.dto'

@ApiTags('coins')
@Controller('coins')
export class CoinsController {
  constructor(
    private readonly coinsService: CoinsService,
    private readonly coinPriceSyncService: CoinPriceSyncService,
  ) {}

  @Get('')
  @UseInterceptors(ListResponseInterceptor)
  async list(@Query() query: ListCoinsRequestDto) {
    return this.coinsService.list(query)
  }

  @Get(':id')
  @UseInterceptors(ItemResponseInterceptor)
  async findById(@Param('id') id: string) {
    return this.coinsService.findOne(id)
  }

  @Post('')
  // @UseGuards(AuthAdminGuard)
  @UseInterceptors(ItemResponseInterceptor)
  async create(@Body() request: CreateCoinDto) {
    return this.coinsService.create(request)
  }

  @Post('sync')
  // @UseGuards(AuthAdminGuard)
  @UseInterceptors(ItemResponseInterceptor)
  async syncPrices() {
    await this.coinPriceSyncService.syncNow()
    return { message: 'Coin price sync completed successfully' }
  }

  @Post(':id')
  // @UseGuards(AuthAdminGuard)
  @UseInterceptors(ItemResponseInterceptor)
  async update(@Param('id') id: string, @Body() request: UpdateCoinDto) {
    return this.coinsService.update(id, request)
  }

  @Delete(':id')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(ItemResponseInterceptor)
  async delete(@Param('id') id: string) {
    return this.coinsService.delete(id)
  }
}
