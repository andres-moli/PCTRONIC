import { registerEnumType } from '@nestjs/graphql';

export enum VisitProjectStatusEnum {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

registerEnumType(VisitProjectStatusEnum, {
  name: 'VisitProjectStatusEnum',
  description: 'Estados posibles para un proyecto de visita',
});
