import { Module } from '@nestjs/common';
import { JobDetailService } from '../domain/services/job-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobDetail } from '../infrastructure/schemas';
import { JobDetailRepository } from '../domain/repository';
import { TypeOrmJobDetailRepository } from '../infrastructure/repository';

@Module({
  imports: [TypeOrmModule.forFeature([JobDetail])],
  controllers: [],
  providers: [
    JobDetailService,
    {
      provide: JobDetailRepository,
      useClass: TypeOrmJobDetailRepository,
    },
  ],
  exports: [JobDetailService],
})
export class JobDetailModule {}
