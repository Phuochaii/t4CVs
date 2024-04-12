import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({ description: 'File data (base64 encoded)' })
  file: string;

  @ApiProperty({ description: 'File name' })
  filename: string;

  @ApiProperty({ description: 'File MIME type' })
  mimetype: string;
}
