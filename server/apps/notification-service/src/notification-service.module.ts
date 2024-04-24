import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification-service.controller';
import { NotificationServiceService } from './services';
import { Notification, User_Notification } from './entities';
import { databaseConfig } from './database/init';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    TypeOrmModule.forFeature([Notification, User_Notification]),
  ],
  controllers: [NotificationController],
  providers: [NotificationServiceService],
})
export class NotificationServiceModule { }
