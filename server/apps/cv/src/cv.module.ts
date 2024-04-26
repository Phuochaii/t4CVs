import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CVController } from './cv.controller';
import { CVService } from './cv.service';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, 'src', 'table.sql'),
      synchronize: true,
      entities: [join(__dirname, 'src', 'entities', '**', '*.entity.ts')],
    }),
  ],
  controllers: [CVController],
  providers: [CVService],
})
export class CVModule {}
