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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findUserById(@Param('id') id: number): Observable<string> {
    return this.userService.findJobById(id);
  }

  // @Post('create')
  // @UseInterceptors(FileInterceptor('image'))
  // createUser(
  //   @UploadedFile() image: Express.Multer.File,
  //   @Body() user: CreateUserDTO,
  // ): Observable<string> {
  //   return this.userService.createUser(user, image);
  // }
}
