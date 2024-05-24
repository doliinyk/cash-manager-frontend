import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from 'shared/models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  ChangeUserNameAndEmail,
  GetUser,
  LoginUser,
  LogoutUser,
  ResetPassword,
  UserLoginFailed,
  UserLoginSuccess
} from 'shared/store/auth/auth.actions';
import { catchError, tap } from 'rxjs';
import { LoginPayload } from 'shared/models/login.payload';
import { ShowMessageBar } from 'shared/store/app/app.actions';
import { RemoveTokens, SetTokens } from 'shared/store/token/token.actions';
import { GetAllCategories } from 'shared/store/category/category.actions';
import { LocalizationService } from 'shared/services/localization/localization.service';

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
    private router: Router,
    private localizationService: LocalizationService
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

  @Action(ResetPassword)
  resetPassword({ dispatch }: StateContext<UserStateModel>, { id, securityCode, password }: ResetPassword) {
    return this.httpClient
      .post<void>('http://localhost:8080/api/v1/auth/reset', {
        id: id,
        securityCode: securityCode,
        password: password
      })
      .pipe(
        tap(() => {
          dispatch(new ShowMessageBar({ message: 'Success', type: 'success' }));
          return this.router.navigate(['/login']);
        }),
        catchError((err: HttpErrorResponse) => {
          return dispatch(new ShowMessageBar({ message: err.error.message, type: 'success' }));
        })
      );
  }

  @Action(ChangeUserNameAndEmail)
  changeUserNameAndEmail(
    { patchState, dispatch }: StateContext<UserStateModel>,
    { name, email }: ChangeUserNameAndEmail
  ) {
    const locale: string = this.localizationService.getLocalization();
    const params = new HttpParams()
      .set('locale', locale)
      .set('redirectUrl', location.href.replace('/user/profile', '/auth/activation'));
    return this.httpClient
      .patch<UserStateModel>(
        'http://localhost:8080/api/v1/user',
        {
          login: name,
          email: email
        },
        { params: params }
      )
      .pipe(
        tap((data: UserStateModel) => {
          patchState({
            login: data.login,
            email: data.email,
            account: data.account,
            isAuthorized: true
          });
          dispatch(new ShowMessageBar({ message: 'Success', type: 'success' }));
          dispatch(new LogoutUser());
        }),
        catchError((error: HttpErrorResponse) => {
          return dispatch(new ShowMessageBar({ message: error.error.message, type: 'error' }));
        })
      );
  }
}
