import { Expose } from 'class-transformer'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  @Expose()
  id: string

  @Column('bigint', {
    name: 'created_at',
    nullable: true,
  })
  @Expose({ name: 'created_at' })
  createdAt: string

  @Column('bigint', {
    name: 'updated_at',
    nullable: true,
  })
  @Expose({ name: 'updated_at' })
  updatedAt: string

  @BeforeInsert()
  beforeInsert() {
    if (!this.createdAt) {
      this.createdAt = new Date().getTime().toString()
      this.updatedAt = new Date().getTime().toString()
    }
  }

  @BeforeUpdate()
  beforeUpdated() {
    this.updatedAt = new Date().getTime().toString()
  }
}
