export enum IntercessionTypeEnum {
  TECHNIC = 'TECHNIC',
  HOUSEHOLD = 'HOUSEHOLD',
  MEDIATION = 'MEDIATION',
}

export enum IntercessionStatusEnum {
  DONE = 'DONE',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  TO_PLAN = 'TO_PLAN',
}

export function parseType( type: string ): IntercessionTypeEnum{
  switch ( type ) {
    case 'Technique':
      return IntercessionTypeEnum.TECHNIC;
    case 'Ménage':
      return IntercessionTypeEnum.HOUSEHOLD;
    case 'Médiation':
      return IntercessionTypeEnum.MEDIATION;
  }
}

export function parseStatus( status: string ): IntercessionStatusEnum{
  switch ( status ) {
    case 'Réalisé':
      return IntercessionStatusEnum.DONE;
    case 'En cours':
      return IntercessionStatusEnum.IN_PROGRESS;
    case 'À planifier':
      return IntercessionStatusEnum.TO_PLAN;
    case 'En attente':
      return IntercessionStatusEnum.PENDING;
  }
}
