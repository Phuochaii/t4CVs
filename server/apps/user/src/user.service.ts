import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { CreateUserDTO } from './dto/Req/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new RpcException('User not found');
    }
    return user;
  }

  async createUser(user: CreateUserDTO) {
    await this.userRepository.save(user);
    return 'User created successfully!';
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
