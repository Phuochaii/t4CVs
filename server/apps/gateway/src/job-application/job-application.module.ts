// import { Module } from '@nestjs/common';
// import { JobApplicationService } from './job-application.service';
// import { JobApplicationController } from './job-application.controller';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { JOBAPPLICATION_PACKAGE_NAME } from '@app/common';
// import { join } from 'path';

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: JOBAPPLICATION_PACKAGE_NAME,
//         transport: Transport.GRPC,
//         options: {
//           url: 'localhost:50051',
//           package: JOBAPPLICATION_PACKAGE_NAME,
//           protoPath: join(__dirname, './proto/job-application.proto'),
//         },
//       },
//   ])],
//   controllers: [JobApplicationController],
//   providers: [JobApplicationService],
// })
// export class JobApplicationModule { }

// @Module({
//   imports: [
//     ClientsModule.register([
//       {
//         name: JOBAPPLICATION_PACKAGE_NAME,
//         transport: Transport.GRPC,
//         options: {
//           url: 'localhost:50051',
//           package: JOBAPPLICATION_PACKAGE_NAME,
//           protoPath: join(__dirname, './proto/job-application.proto'),
//         },
//       },
//   ])],
//   controllers: [JobApplicationController],
//   providers: [JobApplicationService],
// })
// export class JobApplicationModule { }

