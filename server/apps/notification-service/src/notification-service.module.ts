import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { NotificationController } from './notification-service.controller';
import { NotificationServiceService } from './services';
import { Notification, User_Notification } from './entities';
import { DatabaseConfiger, DatabaseOptions } from './database/init';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./configs/.env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const defaultConfig: DatabaseOptions = {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: `${configService.get('DB_PASSWORD')}`,
          database: configService.get('DB_NOTIFICATION_DATABASE'),
          autoLoadEntities: true,
          synchronize: true,
        };
        console.log(defaultConfig);
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();
      },
    }),
    TypeOrmModule.forFeature([Notification, User_Notification]),
  ],
  controllers: [NotificationController],
  providers: [NotificationServiceService],
})
export class NotificationServiceModule {}
