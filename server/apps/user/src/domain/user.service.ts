import { CreateUserDTO, QueryDTO } from './dto/Req';
import { FindUserRespDTO } from './dto/Resp/find-users.dto';
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

  async findAll(query: QueryDTO) {
    const { page = 1, limit = 10, ...newQuery } = query;
    const skip = (page - 1) * limit;
    const users = await this.userRepository.searchUser(newQuery);

    const result: FindUserRespDTO = {
      page: parseInt(String(page)),
      limit: parseInt(String(limit)),
      total: users.length,
      total_pages: Math.ceil(users.length / limit),
      data: users.slice(skip, skip + limit),
    };
    return result;
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
