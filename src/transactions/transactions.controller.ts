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
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto, ListTransactionsRequestDto, UpdateTransactionDto } from './transactions.dto'
import { IRequestWithAccessToken } from 'src/middlewares/validate-access-token.middleware'

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ListResponseInterceptor)
  async list(@Query() query: ListTransactionsRequestDto, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.transactionsService.list(query, parseInt(tokenInfo['uid']))
  }

  @Get(':id')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async findById(@Param('id') id: string, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.transactionsService.findOne(id, parseInt(tokenInfo['uid']))
  }

  @Post('')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async create(@Body() createRequest: CreateTransactionDto, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.transactionsService.create(createRequest, parseInt(tokenInfo['uid']))
  }

  @Post(':id')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async update(@Param('id') id: string, @Body() updateRequest: UpdateTransactionDto, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.transactionsService.update(id, updateRequest, parseInt(tokenInfo['uid']))
  }

  @Delete(':id')
  @ApiBearerAuth('access-token')
  @UseInterceptors(ItemResponseInterceptor)
  async delete(@Param('id') id: string, @Req() request: IRequestWithAccessToken) {
    const tokenInfo = request['accessTokenInfo']
    return this.transactionsService.delete(id, parseInt(tokenInfo['uid']))
  }
}