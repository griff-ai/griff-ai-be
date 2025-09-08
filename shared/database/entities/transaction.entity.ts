import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('transactions')
export class TransactionEntity {
  @PrimaryColumn('bigint', { name: 'id' })
  @ApiProperty()
  @Expose()
  id: number

  @Column('bigint', { name: 'user_id' })
  @ApiProperty()
  @Expose()
  userId: number

  @Column('numeric', { 
    name: 'fees', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  fees: string

  @Column('numeric', { 
    name: 'price', 
    precision: 20, 
    scale: 10 
  })
  @ApiProperty()
  @Expose()
  price: string

  @Column('numeric', { 
    name: 'proceeds', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  proceeds: string

  @Column('numeric', { 
    name: 'cost', 
    precision: 20, 
    scale: 10 
  })
  @ApiProperty()
  @Expose()
  cost: string

  @Column('varchar', { name: 'transaction_type', length: 10 })
  @ApiProperty()
  @Expose()
  transactionType: string

  @Column('numeric', { 
    name: 'profit_loss', 
    precision: 20, 
    scale: 10 
  })
  @ApiProperty()
  @Expose()
  profitLoss: string

  @Column('numeric', { 
    name: 'quantity', 
    precision: 20, 
    scale: 10 
  })
  @ApiProperty()
  @Expose()
  quantity: string

  @Column('varchar', { 
    name: 'currency', 
    length: 10, 
    default: "'usd'" 
  })
  @ApiProperty()
  @Expose()
  currency: string

  @Column('timestamp', { name: 'transaction_timestamp' })
  @ApiProperty()
  @Expose()
  transactionTimestamp: Date

  @Column('text', { name: 'notes', nullable: true })
  @ApiProperty()
  @Expose()
  notes: string

  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  @Expose()
  createdAt: Date

  @Column('timestamp', { 
    name: 'updated_at', 
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  @ApiProperty()
  @Expose()
  updatedAt: Date
}