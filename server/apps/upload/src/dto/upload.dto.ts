import { ApiProperty } from '@nestjs/swagger';

export class UploadCVDto {
  @ApiProperty({ description: 'File data (base64 encoded)' })
  file: string;

  @ApiProperty({ description: 'File name' })
  filename: string;

  @ApiProperty({ description: 'File MIME type' })
  mimetype: string;

  @ApiProperty({ description: 'File size in bytes' })
  fileSize: number;

  @ApiProperty({ description: 'User ID who uploaded the CV' })
  userId: string;

  @ApiProperty({ description: 'ID of the CV' })
  cvId: string;

  @ApiProperty({ description: 'Date of upload' })
  uploadDate: string;

  @ApiProperty({ description: 'Date of last update' })
  updateDate: string;
}
