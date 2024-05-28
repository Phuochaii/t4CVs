import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationRepository, UserNotificationRepository } from "../domain/repository"
import { TypeOrmUserNotificationRepository } from './repository';
import { NotificationSchema, UserNotificationSchema } from './schema';
import { TypeOrmNotificationRepository } from './repository/notification.repository';
import { DatabaseConfiger, DatabaseOptions } from './database/init';

@Module({
    imports: [
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
                const databaseConfiger = new DatabaseConfiger(defaultConfig);
                return databaseConfiger.config();
            },
        }),
        TypeOrmModule.forFeature([NotificationSchema, UserNotificationSchema]),
    ],
    providers: [
        {
            provide: UserNotificationRepository,
            useClass: TypeOrmUserNotificationRepository,
        },
        {
            provide: NotificationRepository,
            useClass: TypeOrmNotificationRepository,
        }
    ],
    exports: [UserNotificationRepository, NotificationRepository],
})
export class NotificationPersistenceModule { }