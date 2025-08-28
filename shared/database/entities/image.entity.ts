import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('images')
export class ImageEntity extends BaseEntity {
  @Column('varchar', { name: 'link' })
  @ApiProperty()
  @Expose()
  link: string;

  @Column('varchar', { name: 'path' })
  @ApiProperty()
  @Expose()
  path: string;

  @Column('bigint', { name: 'in_out_id' })
  @ApiProperty({ name: 'in_out_id' })
  @Expose({ name: 'in_out_id' })
  inOutId: string;

  @Column('text', { name: 'note' })
  @ApiProperty()
  @Expose()
  note: string;
}
