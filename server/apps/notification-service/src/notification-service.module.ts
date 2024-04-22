import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification-service.controller';
import { NotificationServiceService } from './services';
import { Notification, User_Notification } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
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
