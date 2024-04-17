import { Module } from '@nestjs/common';
import { MajorService } from './major.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from '../entities/major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Major])],
  controllers: [],
  providers: [MajorService],
  exports: [MajorService],
})
export class MajorModule {}
