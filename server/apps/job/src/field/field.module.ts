import { Module } from '@nestjs/common';
import { FieldService } from '../domain/services/field.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from '../infrastructure/schemas/field.schema';
import { FieldRepository } from '../domain/repository';
import { TypeOrmFieldRepository } from '../infrastructure/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Field])],
  controllers: [],
  providers: [
    FieldService,
    {
      provide: FieldRepository,
      useClass: TypeOrmFieldRepository,
    },
  ],
  exports: [FieldService],
})
export class FieldModule {}
