import { FunctionalityModel, FunctionalityTag } from "../../../security/models/functionality.model";

const key = 'general.notification-config';

const name = 'Notification-config';

export const FunctionalityKeys = {
  name,
  key,
  description: `${name} Resolver`,
  tags: [FunctionalityTag.RESOLVER, FunctionalityTag.PARENT],
  CREATE: {
    name: 'CREATE',
    key: `${key}.create`,
    description: `Create new ${name}`,
    tags: [FunctionalityTag.METHOD, FunctionalityTag.STANDARD],
  } as FunctionalityModel,
  FIND: {
    name: 'FIND',
    key: `${key}.find`,
    description: `Find a ${name}/s`,
      tags: [FunctionalityTag.METHOD, FunctionalityTag.STANDARD],
    } as FunctionalityModel,
  UPDATE: {
    name: 'UPDATE',
    key: `${key}.update`,
    description: `Update an ${name}`,
    tags: [FunctionalityTag.METHOD, FunctionalityTag.STANDARD],
  } as FunctionalityModel,
  REMOVE: {
    name: 'REMOVE',
    key: `${key}.remove`,
    description: `Remove an ${name}`,
    tags: [FunctionalityTag.METHOD, FunctionalityTag.STANDARD],
  } as FunctionalityModel,
};