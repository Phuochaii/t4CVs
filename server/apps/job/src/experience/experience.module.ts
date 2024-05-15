import { Module } from '@nestjs/common';
import { ExperienceService } from '../domain/services/experience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from '../infrastructure/schemas/experience.schema';
import { ExperienceRepository } from '../domain/repository';
import { TypeOrmExperienceRepository } from '../infrastructure/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  controllers: [],
  providers: [
    {
      provide: ExperienceService,
      useFactory: (experienceRepository: ExperienceRepository) => {
        return new ExperienceService(experienceRepository);
      },
      inject: [ExperienceRepository],
    },
    {
      provide: ExperienceRepository,
      useClass: TypeOrmExperienceRepository,
    },
  ],
  exports: [ExperienceService],
})
export class ExperienceModule {}
