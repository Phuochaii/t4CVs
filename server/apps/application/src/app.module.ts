import { Module } from '@nestjs/common';
import { ApplicationModule } from './application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/init';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
