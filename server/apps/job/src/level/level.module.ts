import { Module } from '@nestjs/common';
import { LevelService } from '../domain/services/level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from '../infrastructure/schemas';
import { LevelRepository } from '../domain/repository';
import { TypeOrmLevelyRepository } from '../infrastructure/repository';

@Module({
  imports: [TypeOrmModule.forFeature([Level])],
  controllers: [],
  providers: [
    {
      provide: LevelService,
      useFactory: (levelRepository: LevelRepository) => {
        return new LevelService(levelRepository);
      },
      inject: [LevelRepository],
    },
    {
      provide: LevelRepository,
      useClass: TypeOrmLevelyRepository,
    },
  ],
  exports: [LevelService],
})
export class LevelModule {}
