import { Controller } from '@nestjs/common';
import * as multer from 'multer';
import { UploadCVDto } from './dto/upload.dto';
import { UploadService } from './upload.service';
import { MessagePattern } from '@nestjs/microservices';

// const upload = multer({
//   dest: './uploads',
//   fileFilter: (req: any, file: any, cb: any) => {
//     if (file.mimetype.match(/\/(pdf|doc|docx)$/i)) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   },
//   limits: { fileSize: 5 * 1024 * 1024 }, // Maximum file size: 5MB
// });

@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello() {
    console.log('Message Hello');
    return 'Hello World';
  }

  @MessagePattern({ cmd: 'upload_cv' })
  uploadCV(upload: UploadCVDto) {
    return this.uploadService.uploadCV(upload);
  }
}

// import {
//   Controller,
//   Post,
//   UploadedFile,
//   UseInterceptors,
//   ParseFilePipeBuilder,
//   HttpStatus,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { CustomUploadFileTypeValidator } from './upload.validators';

// const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 5 * 1024 * 1024;
// const VALID_UPLOADS_MIME_TYPES = [
//   'application/pdf',
//   'application/msword',
//   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// ];

// @Controller()
// export class UploadController {
//   @Post('upload')
//   @UseInterceptors(FileInterceptor('file'))
//   public async uploadFile(
//     @UploadedFile(
//       new ParseFilePipeBuilder()
//         .addValidator(
//           new CustomUploadFileTypeValidator({
//             fileType: VALID_UPLOADS_MIME_TYPES,
//           }),
//         )
//         .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
//         .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
//     )
//     file,
//   ) {
//     return 'file upload successful';
//   }
// }
