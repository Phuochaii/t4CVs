import { Module } from '@nestjs/common';
// import { GuestGrpcServerController } from './application.controller';
import { ApplicationModule } from './application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'test_topcv',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
//create env with postgress
