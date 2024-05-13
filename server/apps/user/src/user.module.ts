import { Module } from '@nestjs/common';
import { UserService } from './domain/services/user.service';
import { UserController } from './application/controllers/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import * as path from 'path';
import {
  DatabaseConfiger,
  DatabaseOptions,
} from './infrastructure/database/init';
import { UserRepository } from './infrastructure/repositories/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../../configs/.env'),
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
          database: configService.get('DB_USER_DATABASE'),
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
        };
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
