import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Put,
  UploadedFiles,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { GetUser, PermissionsGuard, UserClaims } from '../authorization';
import { CreateEmployerAccountDto } from './dto/Req/create-hr.dto';
import { UpdateEmployerCompanyDTO } from './dto/Req/updateEmployerCompany.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateEmployerDTO } from './dto/Req/updateEmployer.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post('account')
  registerAccount(@Body() data: CreateEmployerAccountDto) {
    return this.employerService.createEmployerAccount(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createEmployer(
    @GetUser() user: UserClaims,
    @Body() data: Omit<CreateEmployerDto, 'id'>,
  ): Promise<Observable<string>> {
    return this.employerService.createEmployer({
      id: user.sub,
      ...data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAllEmployers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.employerService.getAllEmployers(page, limit);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Get('check')
  checkEmployer(@GetUser() user: UserClaims): Observable<boolean> {
    console.log('check employer', user.sub);
    return this.employerService.checkEmployer(user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getEmployerProfile(@GetUser() user: UserClaims) {
    return this.employerService.findEmployerById(user.sub);
  }

  @Get(':id')
  findEmployerById(@Param('id') id: string) {
    return this.employerService.findEmployerById(id);
  }

  @Get('company/:companyid')
  getEmployerByCompanyId(@Param('companyid') companyid: number) {
    return this.employerService.getEmployerByCompanyId(companyid);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Put('update/companyid')
  updateEmployerCompanyId(
    @GetUser() user: UserClaims,
    @Body() data: Omit<UpdateEmployerCompanyDTO, 'id'>,
  ): Observable<any> {
    return this.employerService.updateEmployerCompanyId({
      id: user.sub,
      ...data,
    });
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
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
    @GetUser() user: UserClaims,
    // @Body('employerId') employerId: string,
  ): Observable<any> {
    return this.employerService.updateEmployerLicense(files, user.sub);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Put('update/licenseStatus')
  updateEmployerLicenseStatus(
    // @Param('id') id: string,
    @GetUser() user: UserClaims,
    @Body() licenseStatus: boolean,
  ): Observable<any> {
    return this.employerService.updateEmployerLicenseStatus(
      user.sub,
      licenseStatus,
    );
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Put('update/phoneNumberStatus')
  updateEmployerPhoneStatus(
    // @Param('id') id: string,
    @GetUser() user: UserClaims,
    @Body() phoneNumberStatus: boolean,
  ): Observable<any> {
    return this.employerService.updateEmployerPhoneStatus(
      user.sub,
      phoneNumberStatus,
    );
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Put('update')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  updateCompany(
    @UploadedFile() file: any,
    @GetUser() user: UserClaims,
    @Body() data: Omit<UpdateEmployerDTO, 'id'>,
  ): Observable<string> {
    return this.employerService.updateEmployer(file, { id: user.sub, ...data });
  }

  @Get('name/:name')
  findCompanyByName(
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
