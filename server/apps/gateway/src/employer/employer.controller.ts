import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/Req/createEmployer.dto';
import { GetUser, PermissionsGuard, UserClaims } from '../authorization';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

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

  @Get(':id')
  findEmployerById(@Param('id') id: string) {
    return this.employerService.findEmployerById(id);
  }

  @Get('position/all')
  getAllPositions(): Observable<string> {
    return this.employerService.getAllPositions();
  }

  @Get('position/:id')
  findPositionById(@Param('id') id: number): Observable<string> {
    return this.employerService.findPositionById(id);
  }

  @UseGuards(AuthGuard('jwt'), PermissionsGuard('role:hr'))
  @Get('check')
  checkEmployer(@GetUser() user: UserClaims): Observable<boolean> {
    return this.employerService.checkEmployer(user.sub);
  }

  @Get(':id/can-update-profile')
  canUpdateProfile(@Param('id') id: string): Promise<boolean> {
    return this.employerService.canUpdateProfile(id);
  }
}
