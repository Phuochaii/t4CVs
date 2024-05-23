// import { Module } from '@nestjs/common';
// import { ApplicationController } from './application.controller';
// import { ApplicationService } from './application.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Application } from './entities/application.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([Application])],
//   controllers: [ApplicationController],
//   providers: [ApplicationService],
//   exports: [ApplicationService],
// })
// export class ApplicationModule {}

import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ConfigModule } from '@nestjs/config';
import { ApplicationApplicationModule } from './application-application.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './configs/.env',
    }),
    ApplicationApplicationModule,
  ],
  controllers: [ApplicationController],
})
export class ApplicationModule {}
