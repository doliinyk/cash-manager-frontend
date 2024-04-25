import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "shared/services/auth/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  accessToken = this.authService.accessToken

  constructor(private authService: AuthService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Authorization') && this.accessToken) {
      console.log("access: " +this.accessToken);
      this.accessToken.subscribe(data=>{
        const authReq = req.clone({
          setHeaders: {
            'Authorization': `Bearer `+ data
          }
        });
        return next.handle(authReq);
      })
    }
    return next.handle(req);
  }
}
