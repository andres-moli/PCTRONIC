import { FunctionalityModel, FunctionalityTag } from './models/functionality.model';
import { FunctionalityKeys as usersFunctionalities} from './users/users.functionalities';
import { FunctionalityKeys as rolesFunctionalities} from './roles/roles.functionalities';
import { FunctionalityKeys as rolesFxFunctionalities} from './roles/roles-fx.functionalities';

export const FunctionalityKeys: FunctionalityModel[] = [
  {
    name: 'security',
    key: 'security',
    description: 'Security Module',
    tags: [FunctionalityTag.MODULE, FunctionalityTag.PARENT],
    children: [
      new FunctionalityModel(usersFunctionalities),
      new FunctionalityModel(rolesFunctionalities),
      new FunctionalityModel(rolesFxFunctionalities),
    ],
  },
];