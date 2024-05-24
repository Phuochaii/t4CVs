import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { CreateUserDTO } from './dto/Req/createUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAllUsers(): Observable<string> {
    return this.userService.findAllUsers();
  }

  @Get('check/:id')
  isUserExist(@Param('id') id: string) {
    return this.userService.isUserExist(id);
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Post('create')
  // @UseInterceptors(FileInterceptor('image'))
  createUser(
    // @UploadedFile() image: Express.Multer.File,
    @Body() user: CreateUserDTO,
  ) {
    return this.userService.createUser(user);
  }
}
