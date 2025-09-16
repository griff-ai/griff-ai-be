import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'shared/database/entities'
import { Like, Repository } from 'typeorm'

import {
  DEFAULT_PAGINATE_LIMIT,
  encryptPassword,
  GRIFF_AI_DB,
  ThrowError,
} from '@lib/common'
import { plainToInstance } from 'class-transformer'
import { CreateUserDto, ListUserRequestDto, UpdateUserDto } from './user.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, GRIFF_AI_DB)
    protected readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async create(request: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { username: request.username },
    })

    if (user) {
      ThrowError('Username code already existed')
    }

    const newUser = plainToInstance(UserEntity, request, {
      ignoreDecorators: true,
    })
    const encryptPasswordUser = encryptPassword(
      request.password,
      this.configService.get('global.jwt.secret'),
    )
    newUser.password = encryptPasswordUser
    return this.userRepository.save(newUser)
  }

  async update(id: string, request: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    })

    if (!user) {
      ThrowError('User is NOT FOUND')
    }

    user.fullname = request.fullname || user.fullname
    user.email = request.email || user.email
    user.birthday = request.birthday || user.birthday
    user.phone = request.phone || user.phone
    user.avatar = request.avatar || user.avatar
    user.role = request.role || user.role
    user.status = request.status || user.status

    if (request.password) {
      const encryptPasswordUser = encryptPassword(
        request.password,
        this.configService.get('global.jwt.secret'),
      )
      user.password = encryptPasswordUser
    }
    return this.userRepository.save(user)
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
    })

    if (!user) {
      ThrowError('User is NOT FOUND')
    }
    return user
  }

  async list(listUserRequestDto: ListUserRequestDto) {
    const query: Record<string, any> = {}
    const {
      page,
      limit,
      username,
      fullname,
      birthday,
      phone,
      cccd,
      role,
      status,
    } = listUserRequestDto

    if (username) {
      query['username'] = Like(`%${username}%`)
    }

    if (fullname) {
      query['fullname'] = Like(`%${fullname}%`)
    }

    if (birthday) {
      query['birthday'] = Like(`%${birthday}%`)
    }

    if (phone) {
      query['phone'] = Like(`%${phone}%`)
    }

    if (role) {
      query['role'] = role
    }

    if (status) {
      query['status'] = status
    }

    const order: Record<string, any> = {
      createdAt: 'DESC',
    }

    const pageQuery = page || 1
    const takeQuery = limit || DEFAULT_PAGINATE_LIMIT
    const result = await this.userRepository.findAndCount({
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
    const user = await this.userRepository.findOne({
      where: { id },
    })

    if (!user) {
      ThrowError('User is NOT FOUND')
    }
    return this.userRepository.delete(id)
  }
}
