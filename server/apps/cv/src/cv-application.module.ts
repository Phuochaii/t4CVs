import { Module } from '@nestjs/common';
import { CvApplication } from './domain/cv.application';
import { CreateCvService } from './domain/service';
import { CvPersistenceModule } from './infrastructure/cv-persistence.module';
import { CvRepository } from './domain/repository';

@Module({
  imports: [CvPersistenceModule],
  providers: [
    {
      provide: CreateCvService,
      useFactory: (cvRepository: CvRepository) => {
        return new CreateCvService(cvRepository);
      },
      inject: [CvRepository],
    },

    {
      provide: CvApplication,
      useFactory: (createCvService: CreateCvService) => {
        return new CvApplication(createCvService);
      },
      inject: [CreateCvService],
    },
  ],
  exports: [CvApplication],
})
export class CvApplicationModule {}
