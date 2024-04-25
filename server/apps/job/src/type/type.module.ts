import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from '../entities/type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {}
