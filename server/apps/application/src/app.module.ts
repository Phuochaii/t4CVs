import { Module } from '@nestjs/common';
import { ApplicationModule } from './application.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'test_topcv',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
//create env with postgress
