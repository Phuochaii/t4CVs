import { Module } from '@nestjs/common';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entities';
import { PositionModule } from './position/position.module';
import { DatabaseConfiger, DatabaseOptions } from './database/init';
import * as path from 'path';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('DB_HOST'),
//         port: configService.get('DB_PORT'),
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_DATABASE'),
//         // entities: [__dirname + '/**/*.entity{.ts,.js}'],
//         autoLoadEntities: true,
//         synchronize: true,
//       }),
//     }),
//     TypeOrmModule.forFeature([Employer]),
//     PositionModule,
//   ],
//   controllers: [EmployerController],
//   providers: [EmployerService],
// })

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
          database: configService.get('DB_EMPLOYER_DATABASE'),
          // entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: true,
        };
        const databaseConfiger = new DatabaseConfiger(defaultConfig);
        return databaseConfiger.config();
      },
    }),
    TypeOrmModule.forFeature([Employer]),
    PositionModule,
  ],
  controllers: [EmployerController],
  providers: [EmployerService],
})
export class EmployerModule {}
