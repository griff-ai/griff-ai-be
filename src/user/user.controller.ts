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
import { UserService } from './user.service'
import { CreateUserDto, ListUserRequestDto, UpdateUserDto } from './user.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(ListResponseInterceptor)
  async list(@Query() query: ListUserRequestDto) {
    return this.userService.list(query)
  }

  @Get(':id')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(ItemResponseInterceptor)
  async findById(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Post('')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(ItemResponseInterceptor)
  async create(@Body() request: CreateUserDto) {
    return this.userService.create(request)
  }

  @Post(':id')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(ItemResponseInterceptor)
  async update(@Param('id') id: string, @Body() request: UpdateUserDto) {
    return this.userService.update(id, request)
  }

  @Delete(':id')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(ItemResponseInterceptor)
  async delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }
}
