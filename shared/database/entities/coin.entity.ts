import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('coins')
export class CoinEntity {
  @PrimaryColumn('bigint', { name: 'id' })
  @ApiProperty()
  @Expose()
  id: number

  @Column('varchar', { name: 'symbol', length: 20 })
  @ApiProperty()
  @Expose()
  symbol: string

  @Column('varchar', { name: 'name', length: 100 })
  @ApiProperty()
  @Expose()
  name: string

  @Column('varchar', { name: 'slug', length: 100 })
  @ApiProperty()
  @Expose()
  slug: string

  @Column('varchar', { name: 'image_url', length: 500, nullable: true })
  @ApiProperty()
  @Expose()
  imageUrl: string

  @Column('numeric', { 
    name: 'current_price', 
    precision: 20, 
    scale: 10, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  currentPrice: string

  @Column('numeric', { 
    name: 'market_cap', 
    precision: 20, 
    scale: 2, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  marketCap: string

  @Column('int', { name: 'market_cap_rank', nullable: true })
  @ApiProperty()
  @Expose()
  marketCapRank: number

  @Column('numeric', { 
    name: 'total_volume', 
    precision: 20, 
    scale: 2, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  totalVolume: string

  @Column('numeric', { 
    name: 'circulating_supply', 
    precision: 20, 
    scale: 2, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  circulatingSupply: string

  @Column('numeric', { 
    name: 'total_supply', 
    precision: 20, 
    scale: 2, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  totalSupply: string

  @Column('numeric', { 
    name: 'max_supply', 
    precision: 20, 
    scale: 2, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  maxSupply: string

  @Column('numeric', { 
    name: 'price_change_24h', 
    precision: 20, 
    scale: 10, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  priceChange24h: string

  @Column('numeric', { 
    name: 'price_change_percentage_24h', 
    precision: 8, 
    scale: 4, 
    nullable: true 
  })
  @ApiProperty()
  @Expose()
  priceChangePercentage24h: string

  @Column('timestamp', { name: 'last_updated', nullable: true })
  @ApiProperty()
  @Expose()
  lastUpdated: Date

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