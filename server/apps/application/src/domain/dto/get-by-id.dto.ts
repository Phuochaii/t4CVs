import { Application } from "../entity";

export class GetApplicationDto implements Pick<Application, 'id'> {
  id: number;
}
