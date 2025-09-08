import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ItemResponseInterceptor } from '@lib/common'
import { ListResponseInterceptor } from '@lib/common/interceptors/list-response.interceptor'
import { PortfoliosService } from './portfolios.service'
import { CreatePortfolioDto, ListPortfoliosRequestDto, UpdatePortfolioDto } from './portfolios.dto'

@ApiTags('portfolios')
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Get('')
  @UseInterceptors(ListResponseInterceptor)
  async list(@Query() query: ListPortfoliosRequestDto) {
    return this.portfoliosService.list(query)
  }

  @Get('overview/:userId')
  @UseInterceptors(ItemResponseInterceptor)
  async getPortfolioOverview(@Param('userId') userId: string) {
    return this.portfoliosService.getPortfolioOverview(parseInt(userId))
  }

  @Get(':id')
  @UseInterceptors(ItemResponseInterceptor)
  async findById(@Param('id') id: string) {
    return this.portfoliosService.findOne(id)
  }

  @Post('')
  @UseInterceptors(ItemResponseInterceptor)
  async create(@Body() request: CreatePortfolioDto) {
    return this.portfoliosService.create(request)
  }

  @Post(':id')
  @UseInterceptors(ItemResponseInterceptor)
  async update(@Param('id') id: string, @Body() request: UpdatePortfolioDto) {
    return this.portfoliosService.update(id, request)
  }

  @Delete(':id')
  @UseInterceptors(ItemResponseInterceptor)
  async delete(@Param('id') id: string) {
    return this.portfoliosService.delete(id)
  }
}