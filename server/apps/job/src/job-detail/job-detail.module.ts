import { Module } from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobDetail } from '../entities/job-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobDetail])],
  controllers: [],
  providers: [JobDetailService],
  exports: [JobDetailService],
})
export class JobDetailModule {}
