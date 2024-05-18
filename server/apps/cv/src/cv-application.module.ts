import { Module } from '@nestjs/common';
import { CvApplication } from './domain/cv.application';
import {
  CreateCvService,
  UpdateCvService,
  GetCvService,
  GetAllCvService,
  DeleteCvService,
} from './domain/service';
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
      provide: UpdateCvService,
      useFactory: (cvRepository: CvRepository) => {
        return new UpdateCvService(cvRepository);
      },
      inject: [CvRepository],
    },
    {
      provide: GetCvService,
      useFactory: (cvRepository: CvRepository) => {
        return new GetCvService(cvRepository);
      },
      inject: [CvRepository],
    },

    {
      provide: GetAllCvService,
      useFactory: (cvRepository: CvRepository) => {
        return new GetAllCvService(cvRepository);
      },
      inject: [CvRepository],
    },

    {
      provide: DeleteCvService,
      useFactory: (cvRepository: CvRepository) => {
        return new DeleteCvService(cvRepository);
      },
      inject: [CvRepository],
    },

    {
      provide: CvApplication,
      useFactory: (
        createCvService: CreateCvService,
        updateCvService: UpdateCvService,
        getCvService: GetCvService,
        getAllCvService: GetAllCvService,
        deleteCvService: DeleteCvService,
      ) => {
        return new CvApplication(
          createCvService,
          updateCvService,
          getCvService,
          getAllCvService,
          deleteCvService,
        );
      },
      inject: [
        CreateCvService,
        UpdateCvService,
        GetCvService,
        GetAllCvService,
        DeleteCvService,
      ],
    },
  ],
  exports: [CvApplication],
})
export class CvApplicationModule {}
