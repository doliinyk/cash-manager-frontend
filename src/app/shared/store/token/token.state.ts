import {Action, Selector, State, StateContext} from "@ngxs/store";
import {LoginPayload} from "shared/models/login.payload";
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {UserStateModel} from "shared/models/user";
import {catchError, Observable, tap, throwError} from "rxjs";
import {UserLoginFailed} from "shared/store/auth/auth.actions";
import {
  GetTokens,
  RefreshTokens,
  RemoveTokens,
  SetTokenInterceptor,
  SetTokens,
  TokenExpired
} from "shared/store/token/token.actions";
import {ShowMessageBar} from "shared/store/app/app.actions";
import {Router} from "@angular/router";

@State<LoginPayload>({
  name: 'tokens',
  defaults:{
    accessToken:undefined,
    refreshToken:undefined
  }
})

@Injectable()
export class TokenState{
  constructor(
    private httpClient:HttpClient,
    private router: Router
  ) {
  }
  @Selector()
  static accessToken(state: LoginPayload){
    return state.accessToken;
  }
  @Selector()
  static refreshToken(state:LoginPayload){
    return state.refreshToken;
  }

  @Action(RefreshTokens)
  refreshToken({dispatch, getState}: StateContext<LoginPayload>): Observable<void | LoginPayload>{
    const state = getState();
    return this.httpClient.post<LoginPayload>('http://localhost:8080/api/v1/auth/refresh', {'token':state.refreshToken}).pipe(tap(
        (payload: LoginPayload) => {
          dispatch(new SetTokens(payload));
        }),
      catchError((error: HttpErrorResponse) => dispatch(new TokenExpired()))
    );
  }
  @Action(SetTokens)
  setTokens({patchState}:StateContext<LoginPayload>, {payload}: SetTokens){
    localStorage.setItem('accessToken', payload.accessToken!);
    localStorage.setItem('refreshToken', payload.refreshToken!);
    patchState({
      accessToken:payload.accessToken,
      refreshToken:payload.refreshToken
    })
  }

  @Action(GetTokens)
  getTokens({patchState}:StateContext<LoginPayload>){
    patchState({
      accessToken:localStorage.getItem('accessToken') || undefined,
      refreshToken: localStorage.getItem('refreshToken') || undefined
    })
  }

  @Action(TokenExpired)
  tokenExpired({dispatch}:StateContext<LoginPayload>){
    dispatch(new ShowMessageBar({message: 'Token expired', type: 'error'}));
    dispatch(new RemoveTokens());
    this.router.navigate(['auth/login']);
  }

  @Action(RemoveTokens)
  removeTokens({patchState}:StateContext<LoginPayload>){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    patchState({
      accessToken: undefined,
      refreshToken:undefined
    })
  }
}
