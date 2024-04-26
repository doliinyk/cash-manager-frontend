import {LoginPayload} from "shared/models/login.payload";
import {HttpHandler, HttpHandlerFn, HttpRequest} from "@angular/common/http";


export class RefreshTokens{
  static readonly type = '[tokens] refresh';
}

export class SetTokens{
  static readonly type = '[tokens] set';
  constructor(public payload:LoginPayload) {
  }
}

export class GetTokens{
  static readonly type = '[tokens] get';
}

export class TokenExpired{
  static readonly type = '[tokens] expired';
}

export class SetTokenInterceptor{
  static readonly type = '[tokens] set interceptor';
  constructor(public req: HttpRequest<any>, public next: HttpHandlerFn) {
  }
}

export class RemoveTokens{
  static readonly type = '[tokens] remove'
}
