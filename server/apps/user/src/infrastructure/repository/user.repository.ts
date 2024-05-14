import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../schemas/user.schema';
import { CreateUserDTO } from '../../domain/dto/Req/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async createUser(user: CreateUserDTO) {
    return await this.userRepository.save(user);
  }
}
