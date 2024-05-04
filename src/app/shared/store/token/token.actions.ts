import { LoginPayload } from 'shared/models/login.payload';

export class RefreshTokens {
  static readonly type = '[tokens] refresh';
}

export class SetTokens {
  static readonly type = '[tokens] set';
  constructor(public payload: LoginPayload) {}
}

export class GetTokens {
  static readonly type = '[tokens] get';
}

export class TokenExpired {
  static readonly type = '[tokens] expired';
}

export class RefreshTokenSuccess {
  static readonly type = '[tokens] refresh tokens success';
  constructor(public payload: LoginPayload) {}
}

export class RemoveTokens {
  static readonly type = '[tokens] remove';
}
