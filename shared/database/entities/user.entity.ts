import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { Column, Entity, Index } from 'typeorm'
import { BaseEntity } from './base.entity'

@Index('IDX_USERNAME_USER_UNIQUE_KEY', ['username'], {
  unique: true,
})
@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('varchar', { name: 'username' })
  @ApiProperty()
  @Expose()
  username: string

  @Column('varchar', { name: 'fullname' })
  @ApiProperty()
  @Expose()
  fullname: string

  @Column('varchar', { name: 'email' })
  @ApiProperty()
  @Expose()
  email: string

  @Column('varchar', { name: 'birthday' })
  @ApiProperty()
  @Expose()
  birthday: string

  @Column('varchar', { name: 'phone' })
  @ApiProperty()
  @Expose()
  phone: string

  @Column('varchar', { name: 'password' })
  @ApiProperty()
  @Exclude()
  password: string

  @Column('varchar', { name: 'avatar' })
  @ApiProperty()
  @Expose()
  avatar: string

  @Column('smallint', { name: 'role' })
  @ApiProperty()
  @Expose()
  role: number

  @Column('smallint', { name: 'status' })
  @ApiProperty()
  @Expose()
  status: number
}
