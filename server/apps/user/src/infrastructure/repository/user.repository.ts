import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../schemas/user.schema';
import { CreateUserDTO } from '../../domain/dto/Req';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async createUser(user: CreateUserDTO) {
    return await this.userRepository.save(user);
  }

  async isUserExist(id: string) {
    return !!(await this.userRepository.findOne({ where: { id } }));
  }

  async searchUser(query: any) {
    return await this.userRepository.find({
      where: query,
      order: {
        fullname: 'ASC',
      },
    });
  }
}
