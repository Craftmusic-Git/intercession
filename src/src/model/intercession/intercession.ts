import { IntercessionOperation } from "./intercessionOperation";
import { IntercessionStatusEnum, IntercessionTypeEnum } from "./intercession-enum";

export class Intercession {
  public static readonly IntercessionTypeEnumList = [
    {value: IntercessionTypeEnum.TECHNIC, label: 'Technique'},
    {value: IntercessionTypeEnum.HOUSEHOLD, label: 'Ménage'},
    {value: IntercessionTypeEnum.MEDIATION, label: 'Médiation'},
  ] as { value: IntercessionTypeEnum, label: string }[]

  public static readonly IntercessionStatusEnumList = [
    {value: IntercessionStatusEnum.DONE, label: 'Réalisé'},
    {value: IntercessionStatusEnum.PENDING, label: 'En attente'},
    {value: IntercessionStatusEnum.IN_PROGRESS, label: 'En cours'},
    {value: IntercessionStatusEnum.TO_PLAN, label: 'À planifier'},
  ] as { value: string, label: string }[]

  static getStatusText( status: IntercessionStatusEnum ){
    return Intercession.IntercessionStatusEnumList.filter((s) => s.value === status)[0].label;
  }

  static getTypeText( type: IntercessionTypeEnum ){
    return Intercession.IntercessionTypeEnumList.filter((t) => t.value === type)[0].label;
  }

  id: number;
  address: string;
  coordinates: { lat: number, lng: number };
  operations: IntercessionOperation[];
}
