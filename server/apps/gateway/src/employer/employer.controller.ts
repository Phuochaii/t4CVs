import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  Put,
  UploadedFiles,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { UpdateEmployerCompanyDTO } from './dto/Req/updateEmployerCompany.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateEmployerDTO } from './dto/Req/updateEmployer.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post('create')
  createEmployer(@Body() data: CreateEmployerDto): Observable<string> {
    return this.employerService.createEmployer(data);
  }

  @Get('all')
  getAllEmployers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.employerService.getAllEmployers(page, limit);
  }

  @Get(':id')
  findEmployerById(@Param('id') id: string) {
    return this.employerService.findEmployerById(id);
  }

  @Get('company/:companyid')
  getEmployerByCompanyId(@Param('companyid') companyid: number) {
    return this.employerService.getEmployerByCompanyId(companyid);
  }

  @Put('update/companyid')
  updateEmployerCompanyId(
    @Body() data: UpdateEmployerCompanyDTO,
  ): Observable<any> {
    return this.employerService.updateEmployerCompanyId(data);
  }

  @Put('update/license')
  @UseInterceptors(
    FilesInterceptor('files', 99, {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  updateEmployerLicense(
    @UploadedFiles() files: any[],
    @Body('employerId') employerId: string,
  ): Observable<any> {
    return this.employerService.updateEmployerLicense(files, employerId);
  }

  @Put('update/licenseStatus/:id')
  updateEmployerLicenseStatus(
    @Param('id') id: string,
    @Body('licenseStatus') licenseStatus: boolean,
  ): Observable<any> {
    return this.employerService.updateEmployerLicenseStatus(id, licenseStatus);
  }

  @Put('update/phoneNumberStatus/:id')
  updateEmployerPhoneStatus(
    @Param('id') id: string,
    @Body('phoneNumberStatus') phoneNumberStatus: boolean,
  ): Observable<any> {
    return this.employerService.updateEmployerPhoneStatus(
      id,
      phoneNumberStatus,
    );
  }

  @Put('update')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  updateEmployer(
    @UploadedFile() file: any,
    @Body() data: UpdateEmployerDTO,
  ): Observable<string> {
    return this.employerService.updateEmployer(file, data);
  }

  @Get('name/:name')
  findEmployerByName(
    @Param('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.employerService.getEmployerByName(name, page, limit);
  }

  @Get('position/all')
  getAllPositions(): Observable<string> {
    return this.employerService.getAllPositions();
  }

  @Get('position/:id')
  findPositionById(@Param('id') id: number): Observable<string> {
    return this.employerService.findPositionById(id);
  }
}
