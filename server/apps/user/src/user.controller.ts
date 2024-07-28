import { Controller } from '@nestjs/common';
import { UserService } from './domain/services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDTO, QueryDTO } from './domain/dto/Req';
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
  findAll(query: QueryDTO) {
    return this.userService.findAll(query);
  }

  @MessagePattern({ cmd: 'check_user' })
  check(id: string) {
    return this.userService.check(id);
  }

  @MessagePattern({ cmd: 'is_user_exist' })
  isUserExist(id: string) {
    return this.userService.isUserExist(id);
  }
}
