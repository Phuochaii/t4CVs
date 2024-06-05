import { Controller } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO } from './domain/dto/Req';
import { UpdateUserDTO } from './domain/dto/Req/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'find_user_by_id' })
  findById(id: string) {
    return this.userService.findById(id);
  }

  @MessagePattern({ cmd: 'create_user' })
  async create(user: CreateUserDTO) {
    return await this.userService.createUser(user);
  }

  @MessagePattern({ cmd: 'update_user' })
  async update(updateUserDTO: UpdateUserDTO) {
    return await this.userService.updateUser(updateUserDTO);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  findAll() {
    return this.userService.findAll();
  }
  @MessagePattern({ cmd: 'is_user_exist' })
  isUserExist(id: string) {
    return this.userService.isUserExist(id);
  }
}
