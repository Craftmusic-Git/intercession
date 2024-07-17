import { IntercessionStatusEnum, IntercessionTypeEnum } from "./intercession-enum";

export class IntercessionOperation {
  id: number;
  description: string;
  type: IntercessionTypeEnum;
  status: IntercessionStatusEnum;
  date: Date;
}
