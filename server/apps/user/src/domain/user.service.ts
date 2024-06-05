import { CreateUserDTO } from './dto/Req';
import { UserRepository } from './repository';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async isUserExist(id: string) {
    return await this.userRepository.isUserExist(id);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async createUser(createUserDTO: CreateUserDTO) {
    console.log('createUserDTO', createUserDTO);
    const user = await this.userRepository.findById(createUserDTO.id);
    if (user) {
      return null;
    }
    return await this.userRepository.createUser(createUserDTO);

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

  async check(id: string) {
    const user = await this.userRepository.findById(id);
    return !!user;
  }
}
