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
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { GetUser, PermissionsGuard, UserClaims } from '../authorization';
import { CreateEmployerAccountDto } from './dto/Req/create-hr.dto';
import { UpdateEmployerCompanyDTO } from './dto/Req/updateEmployerCompany.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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

  @Put('update/companyid')
  updateEmployerCompanyId(
    @Body() data: UpdateEmployerCompanyDTO,
  ): Observable<any> {
    return this.employerService.updateEmployerCompanyId(data);
  }

  @Put('update/license')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  updateEmployerLicense(
    @UploadedFile() file: any,
    @Body('employerId') employerId: string,
  ): Observable<any> {
    return this.employerService.updateEmployerLicense(file, employerId);
  }

  @Put('update/licenseStatus/:id')
  updateEmployerLicenseStatus(
    @Param('id') id: string,
    @Body() licenseStatus: boolean,
  ): Observable<any> {
    return this.employerService.updateEmployerLicenseStatus(id, licenseStatus);
  }

  @Put('update/phoneNumberStatus/:id')
  updateEmployerPhoneStatus(
    @Param('id') id: string,
    @Body() phoneNumberStatus: boolean,
  ): Observable<any> {
    return this.employerService.updateEmployerPhoneStatus(
      id,
      phoneNumberStatus,
    );
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
