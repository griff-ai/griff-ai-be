import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { ItemResponseInterceptor } from '@lib/common'
import { ListResponseInterceptor } from '@lib/common/interceptors/list-response.interceptor'
import { PortfolioCoinsService } from './portfolio-coins.service'
import { PortfolioCalculationService } from './portfolio-calculation.service'
import { CreatePortfolioCoinDto, ListPortfolioCoinsRequestDto, UpdatePortfolioCoinDto } from './portfolio-coins.dto'
import { IRequestWithAccessToken } from 'src/middlewares/validate-access-token.middleware'

@ApiTags('portfolio-coins')
@Controller('portfolio-coins')
export class PortfolioCoinsController {
  constructor(
    private readonly portfolioCoinsService: PortfolioCoinsService,
    private readonly portfolioCalculationService: PortfolioCalculationService,
  ) {}

  @Get('')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ListResponseInterceptor)
  async list(@Query() query: ListPortfolioCoinsRequestDto, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.portfolioCoinsService.list(query, parseInt(tokenInfo['uid']))
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async findById(@Param('id') id: string, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.portfolioCoinsService.findOne(id, parseInt(tokenInfo['uid']))
  }

  @Post('')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async create(@Body() createRequest: CreatePortfolioCoinDto, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.portfolioCoinsService.create(createRequest, parseInt(tokenInfo['uid']))
  }

  @Post(':id')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async update(@Param('id') id: string, @Body() updateRequest: UpdatePortfolioCoinDto, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.portfolioCoinsService.update(id, updateRequest, parseInt(tokenInfo['uid']))
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async delete(@Param('id') id: string, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.portfolioCoinsService.delete(id, parseInt(tokenInfo['uid']))
  }

  @Post('calculate')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async calculatePortfolio(@Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    await this.portfolioCalculationService.calculatePortfolioNow(parseInt(tokenInfo['uid']))
    return { message: 'Portfolio calculation completed successfully' }
  }

  @Post('calculate-all')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async calculateAllPortfolios() {
    await this.portfolioCalculationService.calculateAllPortfoliosNow()
    return { message: 'All portfolios calculation completed successfully' }
  }
}