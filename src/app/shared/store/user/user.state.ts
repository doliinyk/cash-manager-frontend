import {Action, Selector, State, StateContext} from "@ngxs/store";
import {UserStateModel} from "shared/models/user";
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {
  GetUser,
  LoginUser,
  LogoutUser,
  RefreshToken,
  UserLoginFailed,
  UserLoginSuccess
} from "shared/store/user/user.actions";
import {RegistrationStateModel} from "shared/models/register";
import {RegisterUser} from "shared/store/registration/registration.actions";
import {LoginResponse} from "shared/models/login.response";
import {catchError, Observable, tap} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {LoginPayload} from "shared/models/login.payload";
import {ShowMessageBar} from "shared/store/app/app.actions";

@State<UserStateModel>({
  name: 'user',
  defaults: {
    login: undefined,
    email: undefined,
    isAuthorized: false,
    account: undefined
  }
})

@Injectable()
export class UserState {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
  }

  @Selector()
  static isAuthorized(state: UserStateModel){
    return state.isAuthorized;
  }

  @Selector()
  static user(state:UserStateModel){
    return state;
  }

  @Selector()
  static account(state:UserStateModel){
    return state.account;
  }

  @Selector()
  static accessToken(){
    return localStorage.getItem('accessToken');
  }

  @Action(LoginUser)
  loginUser({dispatch}: StateContext<UserStateModel>, {payload}: LoginUser) {
    let login = payload.login;
    let password = payload.password;
    const headers = new HttpHeaders({'Authorization': 'Basic ' + btoa(login + ':' + password)});
    console.log("login " + login + " password: " + password);
    console.log(headers);
    return this.httpClient.post<LoginPayload>('http://localhost:8080/api/v1/auth/login', {}, {headers: headers}).pipe(tap(
        (loginPayload: LoginPayload) => dispatch(new UserLoginSuccess(loginPayload))),
      catchError((error: HttpErrorResponse) => dispatch(new UserLoginFailed()))
    );
  }

  @Action(UserLoginSuccess)
  userLoginSuccess({dispatch}: StateContext<UserStateModel>, {payload}: UserLoginSuccess): void {
    localStorage.setItem('accessToken', payload.accessToken!);
    localStorage.setItem('refreshToken', payload.refreshToken!);
    dispatch([
      new ShowMessageBar({message: "Harosh", type: 'success'}),
      new GetUser(),
    ]);
    this.router.navigate(['/user/profile']);
  }

  @Action(UserLoginFailed)
  userLoginFailed({dispatch}: StateContext<UserStateModel>): void {
    dispatch(new ShowMessageBar({message: "Помилка", type: 'error'}));
  }

  @Action(GetUser)
  getUserByLogin({patchState}: StateContext<UserStateModel>) {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + accessToken});
    return this.httpClient.get<UserStateModel>('http://localhost:8080/api/v1/user', {headers: headers}).pipe(tap((data: UserStateModel) => patchState({
      login: data.login,
      email: data.email,
      account: data.account,
      isAuthorized: true
    })))
  }

  @Action(LogoutUser)
  logoutUser({patchState}: StateContext<UserStateModel>){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    patchState({
      isAuthorized: false,
      login: undefined,
      email: undefined,
      account: undefined
    })
    this.router.navigate(['']);
  }

  @Action(RefreshToken)
  refreshToken({dispatch}: StateContext<UserStateModel>): Observable<void | LoginPayload>{
    const refreshToken = localStorage.getItem('refreshToken');
    return this.httpClient.post<LoginPayload>('http://localhost:8080/api/v1/auth/refresh', {'token':refreshToken}).pipe(tap(
        (payload: LoginPayload) => {
          localStorage.setItem('accessToken', payload.accessToken!);
          localStorage.setItem('refreshToken', payload.refreshToken!);
        }),
      catchError((error: HttpErrorResponse) => dispatch(new UserLoginFailed()))
    );
  }
}
