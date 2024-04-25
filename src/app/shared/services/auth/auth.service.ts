import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginResponse} from "shared/models/login.response";
import {UserStateModel} from "shared/models/user";
import {LoginUser, LogoutUser, RefreshToken} from "shared/store/user/user.actions";
import {Select, Store} from "@ngxs/store";
import {UserState} from "shared/store/user/user.state";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Select(UserState.user)
  public user$: Observable<UserStateModel> | undefined;

  @Select(UserState.isAuthorized)
  public isAuthorized: Observable<boolean> | undefined;

  @Select(UserState.account)
  public account: Observable<string> | undefined;

  @Select(UserState.accessToken)
  public accessToken: Observable<string> | undefined

  constructor(private httpClient: HttpClient,
              private readonly store: Store) {
  }

  public verifyEmail(userId: string | null, activationToken: string | null): Observable<void> {
    const params = new HttpParams()
      .set('userId', userId ? userId : 'null')
      .set('activationToken', activationToken ? activationToken : 'null');
    return this.httpClient.post<void>('http://localhost:8080/api/v1/auth/activate', {}, {params: params});
  }

  public login(loginResponse: LoginResponse): Observable<UserStateModel> {
    return this.store.dispatch(new LoginUser(loginResponse));
  }
  public logout(): void{
    this.store.dispatch(new LogoutUser());
  }

  public refreshToken(): Observable<any>{
    return this.store.dispatch(new RefreshToken());
  }

}
