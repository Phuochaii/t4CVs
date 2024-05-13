import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDTO } from '../../application/dto/Req/createUser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
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
