import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('portfolio_coins')
export class PortfolioCoinEntity {
  @PrimaryColumn('bigint', { name: 'id' })
  @ApiProperty()
  @Expose()
  id: number

  @Column('bigint', { name: 'user_id' })
  @ApiProperty()
  @Expose()
  userId: number

  @Column('bigint', { name: 'coin_id' })
  @ApiProperty()
  @Expose()
  coinId: number

  @Column('numeric', { 
    name: 'profit_loss', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  profitLoss: string

  @Column('numeric', { 
    name: 'profit_loss_change', 
    precision: 8, 
    scale: 4, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  profitLossChange: string

  @Column('numeric', { 
    name: 'total_holdings', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  totalHoldings: string

  @Column('numeric', { 
    name: 'total_cost', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  totalCost: string

  @Column('numeric', { 
    name: 'total_market_value', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  totalMarketValue: string

  @Column('numeric', { 
    name: 'average_net_cost', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  averageNetCost: string

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