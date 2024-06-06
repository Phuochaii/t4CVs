import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../schemas/user.schema';
import { CreateUserDTO } from '../../domain/dto/Req';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repository';
import { UpdateUserDTO } from '../../domain/dto/Req/update-user.dto';

@Injectable()
export class TypeOrmUserRepository extends UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async createUser(user: CreateUserDTO) {
    return await this.userRepository.save(user);
  }

  async updateUser(user: UpdateUserDTO) {
    return await this.userRepository.save(user);
  }

  async isUserExist(id: string) {
    return !!(await this.userRepository.findOne({ where: { id } }));
  }
}
