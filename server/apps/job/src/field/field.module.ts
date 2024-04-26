import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from '../entities/field.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Field])],
  controllers: [],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}
