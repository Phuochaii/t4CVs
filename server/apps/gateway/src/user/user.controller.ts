import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDTO } from './dto/Req/createUser.dto';
import { CreateUserDto as CreateUserAccountDto} from '../authentication/dto/create-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAllUsers(): Observable<string> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findUserById(@Param('id') id: number): Observable<string> {
    return this.userService.findUserById(id);
  }

  @Post('create')
  // @UseInterceptors(FileInterceptor('image'))
  createUser(
    // @UploadedFile() image: Express.Multer.File,
    @Body() user: CreateUserDTO,
  ): Promise<Observable<string>> {
    return this.userService.createUser(user);
  }

  @Get('check/:id')
  checkUser(@Param('id') id: number): Observable<boolean> {
    return this.userService.checkUser(id);
  }

  @Post('/register')
  registerAccount(@Body() user: CreateUserAccountDto): Promise<Observable<string>> {
    return this.userService.registerAccount(user);
  }
}
