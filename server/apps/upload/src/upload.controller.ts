import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as multer from 'multer';
import { UploadFileDto } from './dto/upload.dto';
import { UploadService } from './upload.service';

const upload = multer({
  dest: './uploads',
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(pdf|doc|docx)$/i)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Maximum file size: 5MB
});

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(upload.single('file'))
  async uploadFile(@UploadedFile() file: any): Promise<string> {
    const uploadFileDto = new UploadFileDto();
    return await this.uploadService.uploadFile(uploadFileDto);
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
