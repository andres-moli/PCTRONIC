import { NotificationTypes } from './notification-type.enum';

export const NotificationSubtypes = {
  [NotificationTypes.Token]: [{name: "signUp"}, {name: "recoverPassword"}, {name: "validateJwt"}]
}