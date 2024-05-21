import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from '../entities/experience.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  controllers: [],
  providers: [ExperienceService],
  exports: [ExperienceService],
})
export class ExperienceModule {}
