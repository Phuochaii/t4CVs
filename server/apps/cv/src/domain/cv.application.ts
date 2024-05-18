import { CreateCvDto } from './dto';
import { CreateCvService } from './service';
import { Cv } from './entity';

export class CvApplication {
  constructor(private readonly createCvService: CreateCvService) {}

  async createCv(request: CreateCvDto): Promise<Cv> {
    return await this.createCvService.execute(request);
  }
}
