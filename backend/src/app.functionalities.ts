import { FunctionalityModel } from './security/models/functionality.model';
import { FunctionalityKeys as securityFunctionalities } from './security/security.functionalities';
import { FunctionalityKeys as generalFunctionalities } from './general/general.functionalities';

export const FunctionalityKeys: FunctionalityModel = {
    name: 'app',
    key: 'app',
    description: 'app',
    children: [
        ...securityFunctionalities,
        ...generalFunctionalities
    ],
};