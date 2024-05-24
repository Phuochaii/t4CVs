import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { UserController } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/schemas/user.schema';
import * as path from 'path';
import { DatabaseConfiger, DatabaseOptions } from './database/init';
import { TypeOrmUserRepository } from './infrastructure/repository';
import { UserRepository } from './domain/repository';

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
  providers: [
    {
      provide: UserService,
      useFactory: (userRepository: UserRepository) => {
        return new UserService(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
})
export class UserModule {}
