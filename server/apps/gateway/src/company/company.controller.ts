import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Query,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/Req/createCompany.dto';
import { UpdateCompanyDto } from './dto/Req/updateCompany.dto';
import { CreateCampaignDto } from './dto/Req/createCampaign.dto';
import { UpdateCampaignDto } from './dto/Req/updateCampaign.dto';
import { UpdateCompanyStatusDto } from './dto/Req/updateCompanyStatus.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser, PermissionsGuard, UserClaims } from '../authorization';
import { AuthGuard } from '@nestjs/passport';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Post('create')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  createCompany(
    @UploadedFile() file: any,
    @Body() data: CreateCompanyDto,
    @GetUser() user: UserClaims,
  ) {
    return this.companyService.createCompany(file, data, user.sub);
  }

  @Get('all')
  getAllCompanies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.companyService.getAllCompanies(page, limit);
  }

  @Get(':id')
  findCompanyById(@Param('id') id: number) {
    return this.companyService.findCompanyById(id);
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
    @Body() data: UpdateCompanyDto,
    @GetUser() user: UserClaims,
  ) {
    return this.companyService.updateCompany(file, data, user.sub);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Put('updateStatus')
  updateCompanyStatus(
    @Body() data: UpdateCompanyStatusDto,
  ): Observable<string> {
    return this.companyService.updateCompanyStatus(data);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:admin'))
  @Delete(':id')
  removeCompany(@Param('id') id: number): Observable<string> {
    return this.companyService.removeCompany(id);
  }

  @Get('name/:name')
  findCompanyByName(
    @Param('name') name: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.companyService.findCompanyByName(name, page, limit);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Post('campaign/create')
  createCampaign(
    @GetUser() user: UserClaims,
    @Body() data: Omit<CreateCampaignDto, 'employerId'>,
  ): Observable<string> {
    return this.companyService.createCampaign({
      employerId: user.sub,
      ...data,
    });
  }

  @Get('campaign/all')
  getAllCampaigns(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Observable<string> {
    return this.companyService.getAllCampaigns(page, limit);
  }

  @Get('campaign/:id')
  findCampaignById(@Param('id') id: number) {
    return this.companyService.findCampaignById(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Put('campaign/update')
  updateCampaign(@Body() data: UpdateCampaignDto): Observable<string> {
    return this.companyService.updateCampaign(data);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Get('campaign/employer/authorize')
  findCampaignAuthor(
    @GetUser() user: UserClaims,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const employerId = user.sub;
    return this.companyService.findCampaignByEmployerId(
      employerId,
      page,
      limit,
    );
  }

  @Get('campaign/employer/:employerId')
  findCampaignByEmployerId(
    @Param('employerId') employerId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.companyService.findCampaignByEmployerId(
      employerId,
      page,
      limit,
    );
  }

  @Get('campaign/employer/all/:employerId')
  findAllCampaignByEmployerId(@Param('employerId') employerId: string) {
    return this.companyService.findAllCampaignByEmployerId(employerId);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Delete('campaign/:id')
  DeleteCampaignService(@Param('id') id: number) {
    return this.companyService.deleteCampaign(id);
  }

  @Get('field/all')
  getAllField() {
    return this.companyService.getAllField();
  }

  @Get('field/:id')
  findFieldById(@Param('id') id: number) {
    return this.companyService.findFieldById(id);
  }
}
