import { CreateCvDto, UpdateCvDto, GetCvDto } from './dto';
import {
  CreateCvService,
  UpdateCvService,
  GetCvService,
  GetAllCvService,
  DeleteCvService,
} from './service';
import { Cv } from './entity';

export class CvApplication {
  constructor(
    private readonly createCvService: CreateCvService,
    private readonly updateCvService: UpdateCvService,
    private readonly getCvService: GetCvService,
    private readonly getAllCvService: GetAllCvService,
    private readonly deleteCvService: DeleteCvService,
  ) {}

  async createCv(request: CreateCvDto): Promise<Cv> {
    return await this.createCvService.execute(request);
  }

  async updateCv(request: UpdateCvDto): Promise<Cv> {
    return await this.updateCvService.execute(request);
  }

  async getCv(request: GetCvDto): Promise<Cv> {
    return await this.getCvService.execute(request);
  }

  async getAllCv(): Promise<Cv[]> {
    return await this.getAllCvService.execute();
  }

  async deleteCv(request: GetCvDto): Promise<Cv> {
    return await this.deleteCvService.execute(request);
  }
}
