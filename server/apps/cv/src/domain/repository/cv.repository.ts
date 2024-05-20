import { CvDto } from '../dto';
import { Cv } from '../entity';

export abstract class CvRepository {
  abstract createCv(cv: CvDto): Promise<Cv>;

  abstract updateCv(cv: CvDto): Promise<Cv>;

  abstract getCv(cv: CvDto): Promise<Cv>;

  abstract getAllCv(): Promise<Cv[]>;

  abstract deleteCv(cv: CvDto): Promise<Cv>;
}
