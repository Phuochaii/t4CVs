import { Module } from '@nestjs/common';
import { EmployerPersistenceModule } from './infrastructure/employer.persistence.module';
import { PositionApplication } from './domain';
import { PositionRepository } from './domain/repository';
import { GetPositionByIdService, GetPositionService } from './domain/service';

@Module({
  imports: [EmployerPersistenceModule],
  providers: [
    {
      provide: GetPositionService,
      useFactory: (positionRepository: PositionRepository) => {
        return new GetPositionService(positionRepository);
      },
      inject: [PositionRepository],
    },
    {
      provide: GetPositionByIdService,
      useFactory: (positionRepository: PositionRepository) => {
        return new GetPositionByIdService(positionRepository);
      },
      inject: [PositionRepository],
    },
    {
      provide: PositionApplication,
      useFactory: (
        getAllPositionService: GetPositionService,
        getPositionByIdService: GetPositionByIdService,
      ) => {
        return new PositionApplication(
          getAllPositionService,
          getPositionByIdService,
        );
      },
      inject: [GetPositionService, GetPositionByIdService],
    },
  ],
  exports: [PositionApplication],
})
export class PositionApplicationModule {}
