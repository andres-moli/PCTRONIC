import { registerEnumType } from '@nestjs/graphql';

export enum ToolUnitStatusEnum {
  AVAILABLE = 'AVAILABLE',     // Disponible
  IN_USE = 'IN_USE',            // En uso
  LOST = 'LOST',                // Perdida
  DAMAGED = 'DAMAGED',          // Dañada
  MAINTENANCE = 'MAINTENANCE',  // En mantenimiento
}

registerEnumType(ToolUnitStatusEnum, {
  name: 'ToolUnitStatusEnum',
  description: 'Estado actual de la unidad de herramienta.',
  valuesMap: {
    AVAILABLE: { description: 'Disponible' },
    IN_USE: { description: 'En uso' },
    LOST: { description: 'Perdida' },
    DAMAGED: { description: 'Dañada' },
    MAINTENANCE: { description: 'En mantenimiento' },
  },
});
