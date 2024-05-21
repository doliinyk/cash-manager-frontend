import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from 'shared/models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetUser, LoginUser, LogoutUser, UserLoginFailed, UserLoginSuccess } from 'shared/store/auth/auth.actions';
import { catchError, tap } from 'rxjs';
import { LoginPayload } from 'shared/models/login.payload';
import { ShowMessageBar } from 'shared/store/app/app.actions';
import { RemoveTokens, SetTokens } from 'shared/store/token/token.actions';
import { GetAllCategories } from 'shared/store/category/category.actions';

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
export class AuthState {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  @Selector()
  static isAuthorized(state: UserStateModel) {
    return state.isAuthorized;
  }

  @Selector()
  static user(state: UserStateModel) {
    return state;
  }

  @Selector()
  static account(state: UserStateModel) {
    return state.account;
  }

  @Action(LoginUser)
  loginUser({ dispatch }: StateContext<UserStateModel>, { payload }: LoginUser) {
    const login = payload.login;
    const password = payload.password;
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(login + ':' + password) });
    console.log('login ' + login + ' password: ' + password);
    console.log(headers);
    return this.httpClient.post<LoginPayload>('http://localhost:8080/api/v1/auth/login', {}, { headers: headers }).pipe(
      tap((loginPayload: LoginPayload) => dispatch(new UserLoginSuccess(loginPayload))),
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return dispatch(new UserLoginFailed());
      })
    );
  }

  @Action(UserLoginSuccess)
  userLoginSuccess({ dispatch }: StateContext<UserStateModel>, { payload }: UserLoginSuccess): void {
    dispatch(new SetTokens(payload));
    dispatch(new GetAllCategories());
    dispatch([new ShowMessageBar({ message: 'Success', type: 'success' }), new GetUser()]);
    this.router.navigate(['/user/profile']);
  }

  @Action(UserLoginFailed)
  userLoginFailed({ dispatch }: StateContext<UserStateModel>): void {
    dispatch(new ShowMessageBar({ message: 'Error', type: 'error' }));
  }

  @Action(GetUser)
  getUserByLogin({ patchState }: StateContext<UserStateModel>) {
    return this.httpClient.get<UserStateModel>('http://localhost:8080/api/v1/user').pipe(
      tap((data: UserStateModel) =>
        patchState({
          login: data.login,
          email: data.email,
          account: data.account,
          isAuthorized: true
        })
      )
    );
  }

  @Action(LogoutUser)
  logoutUser({ patchState, dispatch }: StateContext<UserStateModel>) {
    dispatch(new RemoveTokens());
    patchState({
      isAuthorized: false,
      login: undefined,
      email: undefined,
      account: undefined
    });
    this.router.navigate(['']);
  }
}
