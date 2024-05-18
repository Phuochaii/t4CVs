import { CvDto } from '../dto';
import { Cv } from '../entity';

export abstract class CvRepository {
  abstract createCv(cv: CvDto): Promise<Cv>;
}
