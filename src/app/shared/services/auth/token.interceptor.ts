import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "shared/services/auth/auth.service";
import {catchError, throwError} from "rxjs";
import {RefreshTokens} from "shared/store/token/token.actions";

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (req.url.includes('/assets/i18n/')||req.url.includes('login') || req.url.includes('refresh')) {
    return next(req);
  }
    req = authService.setAuthorization(req);
  return next(req).pipe(
    catchError((e:HttpErrorResponse)=>{
      if (e.status===401){
        authService.refreshToken(req);
      }
      const error = e.error?.message || e.statusText;
      return throwError(()=>error);
    })
  )
};
