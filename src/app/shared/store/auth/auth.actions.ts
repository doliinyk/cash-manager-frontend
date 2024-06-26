import { LoginResponse } from 'shared/models/login.response';
import { LoginPayload } from 'shared/models/login.payload';

export class LoginUser {
  static readonly type = '[user] login';

  constructor(public payload: LoginResponse) {}
}

export class LogoutUser {
  static readonly type = '[user] logout';
}

export class UserLoginSuccess {
  static readonly type = '[user] login success';

  constructor(public payload: LoginPayload) {}
}

export class UserLoginFailed {
  static readonly type = '[user] login failed';

  constructor() {}
}

export class GetUser {
  static readonly type = '[user] get User';

  constructor() {}
}

export class ChangeUserNameAndEmail {
  static readonly type = '[user] changeUserNameAndEmail';

  constructor(
    public name: string,
    public email: string
  ) {}
}

export class ResetPassword {
  static readonly type = '[user] reset password';

  constructor(
    public id: string,
    public securityCode: string,
    public password: string
  ) {}
}
