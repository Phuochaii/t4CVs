import { Module } from '@nestjs/common';
import { MajorService } from '../domain/services/major.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from '../infrastructure/schemas';
import { MajorRepository } from '../domain/repository';
import { TypeOrmMajorRepository } from '../infrastructure/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Major])],
  controllers: [],
  providers: [
    {
      provide: MajorService,
      useFactory: (majorRepository: MajorRepository) => {
        return new MajorService(majorRepository);
      },
      inject: [MajorRepository],
    },
    {
      provide: MajorRepository,
      useClass: TypeOrmMajorRepository,
    },
  ],
  exports: [MajorService],
})
export class MajorModule {}
