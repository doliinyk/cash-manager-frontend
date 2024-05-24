import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from 'shared/models/login.response';
import { UserStateModel } from 'shared/models/user';
import { Select, Store } from '@ngxs/store';
import { ChangeUserNameAndEmail, GetUser, LoginUser, LogoutUser, ResetPassword } from 'shared/store/auth/auth.actions';
import { AuthState } from 'shared/store/auth/auth.state';
import { TokenState } from 'shared/store/token/token.state';
import { GetTokens, RefreshTokens } from 'shared/store/token/token.actions';
import { UserIsAuth } from 'shared/store/app/app.actions';

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
  public accessToken$?: Observable<string>;

  @Select(TokenState.refreshToken)
  public refreshToken$?: Observable<string>;

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

  public refreshToken(): Observable<HttpRequest<any>> {
    return this.store.dispatch(new RefreshTokens());
  }

  public getUserByLogin() {
    return this.store.dispatch(new GetUser());
  }

  public setAuthorization(req: HttpRequest<any>) {
    const token = this.store.selectSnapshot(TokenState.accessToken);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return req;
  }

  getTokens() {
    this.store.dispatch(new GetTokens());
  }

  isUserAuth() {
    this.store.dispatch(new UserIsAuth());
  }

  changeUserNameAndEmail(name: string, email: string) {
    this.store.dispatch(new ChangeUserNameAndEmail(name, email));
  }

  resetPassword(id: string, securityCode: string, password: string) {
    this.store.dispatch(new ResetPassword(id, securityCode, password));
  }
}
