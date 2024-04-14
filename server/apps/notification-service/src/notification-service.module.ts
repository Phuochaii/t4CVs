import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification-service.controller';
import { NotificationServiceService } from './services';
import { Notification, User_Notification } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'notification',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Notification, User_Notification]),
  ],
  controllers: [NotificationController],
  providers: [NotificationServiceService],
})
export class NotificationServiceModule { }
