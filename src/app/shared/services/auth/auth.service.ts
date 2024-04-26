import {HttpClient, HttpEvent, HttpHandler, HttpHandlerFn, HttpParams, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'shared/models/login.response';
import { UserStateModel } from 'shared/models/user';
import { Select, Store } from '@ngxs/store';
import {LoginUser, LogoutUser} from "shared/store/auth/auth.actions";
import {AuthState} from "shared/store/auth/auth.state";
import {TokenState} from "shared/store/token/token.state";
import {RefreshTokens, SetTokenInterceptor} from "shared/store/token/token.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Select(AuthState.user)
  public user$: Observable<UserStateModel> | undefined;

  @Select(AuthState.isAuthorized)
  public isAuthorized: Observable<boolean> | undefined;

  @Select(AuthState.account)
  public account: Observable<string> | undefined;

  @Select(TokenState.accessToken)
  public accessToken?: Observable<string>;

  constructor(
    private httpClient: HttpClient,
    private readonly store: Store
  ) {}

  public verifyEmail(userId: string | null, activationToken: string | null): Observable<void> {
    const params = new HttpParams()
      .set('userId', userId ? userId : 'null')
      .set('activationToken', activationToken ? activationToken : 'null');
    return this.httpClient.post<void>('http://localhost:8080/api/v1/auth/activate', {}, { params: params });
  }

  public login(loginResponse: LoginResponse): Observable<UserStateModel> {
    return this.store.dispatch(new LoginUser(loginResponse));
  }
  public logout(): void {
    this.store.dispatch(new LogoutUser());
  }

  public refreshToken(req: HttpRequest<any>) {
    this.store.dispatch(new RefreshTokens());
  }

  public setAuthorization(req: HttpRequest<any>){
    this.accessToken?.subscribe((data)=>{
      if (data){
        req=req.clone({
          setHeaders:{
            Authorization: `Bearer ${data}`
          }
        })
      }
    })
    return req;
  }
  public setTokenInterceptor(req: HttpRequest<any>, next: HttpHandlerFn):  Observable<HttpEvent<unknown>>{
    return this.store.dispatch(new SetTokenInterceptor(req, next));
  }
}
