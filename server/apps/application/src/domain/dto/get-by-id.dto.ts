import { Application } from "../entity";

export class GetApplicationByIdDto implements Pick<Application, 'id'> {
  id: number;
}
