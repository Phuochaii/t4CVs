// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ApplicationService } from './application.service';
// import { ApplicationController } from './application.controller';
// import { Application } from './entities/application.entity';
// // import { ApplicationRepository } from './application.repository';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres',
//       password: '123456',
//       database: 'test_topcv',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true,
//     }),
//     TypeOrmModule.forFeature([Application]),
//   ],
//   controllers: [ApplicationController],
//   providers: [ApplicationService],
// })
// export class ApplicationModule {}

import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
  exports: [ApplicationService],
})
export class ApplicationModule {}
