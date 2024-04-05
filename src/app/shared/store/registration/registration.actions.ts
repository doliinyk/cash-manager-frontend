import { RegistrationStateModel } from 'shared/models/register';

export class RegisterUser {
  static readonly type = '[user] register';
  constructor(public payload: RegistrationStateModel) {}
}
