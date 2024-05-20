import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmployerController } from './employer.controller';
import { EmployerApplicationModule } from './employer.application.module';
import { PositionApplicationModule } from './position.application.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: './configs/.env',
    // }),
    ConfigModule.forRoot(),
    EmployerApplicationModule,
    PositionApplicationModule,
  ],
  controllers: [EmployerController],
})
export class EmployerServiceModule {}
