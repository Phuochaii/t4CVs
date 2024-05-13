import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserNotificationRepository } from "./domain/repository/interface"
import { UserNotificationRepositoryImp } from './domain/repository/implementation/repository';
import { UserNotificationEntity, NotificationEntity } from './domain/repository/implementation/schema';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USERNAME'),
                    password: `${configService.get('DB_PASSWORD')}`,
                    database: configService.get('DB_NOTIFICATION_DATABASE'),
                    autoLoadEntities: true,
                    synchronize: true,
                };
            },
        }),
        TypeOrmModule.forFeature([UserNotificationEntity, NotificationEntity]),
    ],
    providers: [
        {
            provide: UserNotificationRepository,
            useClass: UserNotificationRepositoryImp,
        },
    ],
    exports: [UserNotificationRepository],
})
export class NotificationPersistenceModule { }