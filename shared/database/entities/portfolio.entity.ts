import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('portfolios')
export class PortfolioEntity {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  @Expose()
  id: number

  @Column('bigint', { name: 'user_id' })
  @ApiProperty()
  @Expose()
  userId: number

  @Column('varchar', { 
    name: 'name', 
    length: 100, 
    default: "'Default Portfolio'" 
  })
  @ApiProperty()
  @Expose()
  name: string

  @Column('numeric', { 
    name: 'total_holdings_value', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  totalHoldingsValue: string

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
    name: 'past_holdings_value', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  pastHoldingsValue: string

  @Column('numeric', { 
    name: 'holdings_change', 
    precision: 20, 
    scale: 10, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  holdingsChange: string

  @Column('numeric', { 
    name: 'holdings_change_percentage', 
    precision: 8, 
    scale: 4, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  holdingsChangePercentage: string

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
    name: 'profit_loss_change_percentage', 
    precision: 8, 
    scale: 4, 
    default: '0.0' 
  })
  @ApiProperty()
  @Expose()
  profitLossChangePercentage: string

  @Column('boolean', { name: 'has_inactive_coins', default: false })
  @ApiProperty()
  @Expose()
  hasInactiveCoins: boolean

  @Column('varchar', { 
    name: 'top_gainer_page_url', 
    length: 500, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  topGainerPageUrl: string

  @Column('varchar', { 
    name: 'top_gainer_image_url', 
    length: 500, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  topGainerImageUrl: string

  @Column('varchar', { 
    name: 'top_gainer_name', 
    length: 100, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  topGainerName: string

  @Column('varchar', { 
    name: 'top_gainer_symbol', 
    length: 20, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  topGainerSymbol: string

  @Column('numeric', { 
    name: 'top_gainer_profit_loss', 
    precision: 20, 
    scale: 10, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  topGainerProfitLoss: string

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