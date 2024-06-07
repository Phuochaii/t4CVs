import { Application } from "../entity";

export class UpdateApplicationDto implements Pick<Application, 'id' | 'status'>{
  id: number;
  status: boolean;
}