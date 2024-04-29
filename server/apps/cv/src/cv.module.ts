import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CVController } from './cv.controller';
import { CVService } from './cv.service';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, 'src', 'table.sql'),
      synchronize: true,
      entities: [join(__dirname, 'src', 'entities', '**', '*.entity.ts')],
    }),
    ConfigModule.forRoot({ envFilePath: '.env.example' }),
  ],
  controllers: [CVController],
  providers: [CVService],
})
export class CVModule {}
