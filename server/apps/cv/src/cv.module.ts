import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { ConfigModule } from '@nestjs/config';
import { CvApplicationModule } from './cv-application.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: './configs/.env',
    // }),
    ConfigModule.forRoot(),
    CvApplicationModule,
  ],
  controllers: [CvController],
})
export class CvModule {}
