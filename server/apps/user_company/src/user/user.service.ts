// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../user.entity';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { DataSource, FindOneOptions } from 'typeorm';
import { User } from 'src/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private userRepository: UserRepository,
  ) {
    this.userRepository = new UserRepository(dataSource);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { id_user: id },
      //relations: ['company'], // load các relation liên quan
    };
    return this.userRepository.findOne(options);
  }

  async create(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async findAllWithCompany(): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .select([
        'user.id_user',
        'user.name_user',
        'user.id_company',
        'company.name_company', // Lấy thuộc tính name_company từ bảng Company
      ])
      .getMany();
  }
}
