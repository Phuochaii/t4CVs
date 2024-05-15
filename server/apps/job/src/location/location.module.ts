import { Module } from '@nestjs/common';
import { LocationService } from '../domain/services/location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../infrastructure/schemas';
import { LocationRepository } from '../domain/repository';
import { TypeOrmLocationRepository } from '../infrastructure/repository';
@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [],
  providers: [
    LocationService,
    {
      provide: LocationRepository,
      useClass: TypeOrmLocationRepository,
    },
  ],
  exports: [LocationService],
})
export class LocationModule {}
