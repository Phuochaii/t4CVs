import { CreateCvDto, UpdateCvDto, GetCvDto, GetArrayCvDto } from './dto';
import {
  CreateCvService,
  UpdateCvService,
  GetCvService,
  GetAllCvService,
  DeleteCvService,
  GetArrayCvService,
} from './service';
import { Cv } from './entity';

export class CvApplication {
  constructor(
    private readonly createCvService: CreateCvService,
    private readonly updateCvService: UpdateCvService,
    private readonly getCvService: GetCvService,
    private readonly getAllCvService: GetAllCvService,
    private readonly deleteCvService: DeleteCvService,
    private readonly getArrayCvService: GetArrayCvService,
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

  async getCvs(request: GetArrayCvDto): Promise<Cv[]> {
    return await this.getArrayCvService.execute(request);
  }

  async deleteCv(request: GetCvDto): Promise<Cv> {
    return await this.deleteCvService.execute(request);
  }
}
