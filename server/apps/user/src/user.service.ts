<<<<<<< HEAD:server/apps/user/src/domain/user.service.ts
import { CreateUserDTO } from './dto/Req';
import { UserRepository } from './repository';
=======
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/Req/createUser.dto';
>>>>>>> 80f65bf8591fcdecb03f2f3aa8bdd4d9670c9256:server/apps/user/src/user.service.ts

@Injectable()
export class UserService {
<<<<<<< HEAD:server/apps/user/src/domain/user.service.ts
  constructor(private readonly userRepository: UserRepository) {}
  async findById(id: string) {
    const user = await this.userRepository.findById(id);
=======
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException('User not found');
    }
>>>>>>> 80f65bf8591fcdecb03f2f3aa8bdd4d9670c9256:server/apps/user/src/user.service.ts
    return user;
  }

  async isUserExist(id: string) {
    return await this.userRepository.isUserExist(id);
  }

  async findAll() {
    return await this.userRepository.find();
  }

<<<<<<< HEAD:server/apps/user/src/domain/user.service.ts
  async createUser(createUserDTO: CreateUserDTO) {
    const user = await this.userRepository.findById(createUserDTO.id);
    if (user) {
      return null;
    }
    return await this.userRepository.createUser(createUserDTO);

=======
  async createUser(user: CreateUserDTO) {
    try {
      await this.userRepository.save(user);
      return 'User created successfully!';
    } catch (error) {
      throw new RpcException('User not created');
    }
>>>>>>> 80f65bf8591fcdecb03f2f3aa8bdd4d9670c9256:server/apps/user/src/user.service.ts
    // const userEntity = await this.userRepository.save({
    //   ...user,
    //   image: `${filename}`,
    //   // image: `http://${BUCKET_NAME}.s3-website-${AWS_S3_REGION}.amazonaws.com/${filename}`,
    // });
    // // const putObjectCommand = new PutObjectCommand({
    // //   Bucket: BUCKET_NAME,
    // //   Key: filename,
    // //   Body: image.buffer,
    // //   ContentDisposition: 'inline',
    // //   ContentType: image.mimetype,
    // // });

    // // await this.s3Client.send(putObjectCommand);

    // return userEntity;
  }
}
