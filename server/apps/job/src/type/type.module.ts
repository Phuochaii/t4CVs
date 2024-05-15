import { Module } from '@nestjs/common';
import { TypeService } from '../domain/services/type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from '../infrastructure/schemas';
import { TypeOrmTypeRepository } from '../infrastructure/repository';
import { TypeRepository } from '../domain/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Type])],
  controllers: [],
  providers: [
    TypeService,
    {
      provide: TypeRepository,
      useClass: TypeOrmTypeRepository,
    },
  ],
  exports: [TypeService],
})
export class TypeModule {}
