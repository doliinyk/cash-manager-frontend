import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, EMPTY } from 'rxjs';
import { RegistrationStateModel } from 'shared/models/register';
import { LocalizationService } from 'shared/services/localization/localization.service';
import { RegisterUser } from 'shared/store/registration/registration.actions';
import { Router } from '@angular/router';
import { ShowMessageBar } from 'shared/store/app/app.actions';

@State<RegistrationStateModel>({
  name: 'registration',
  defaults: {
    login: undefined,
    email: undefined,
    password: undefined
  }
})
@Injectable()
export class RegistrationState {
  @Selector()
  static user(state: RegistrationStateModel): RegistrationStateModel {
    return state;
  }

  constructor(
    private httpClient: HttpClient,
    private localizationService: LocalizationService,
    private router: Router
  ) {}

  @Action(RegisterUser)
  registerUser({ dispatch }: StateContext<RegistrationStateModel>, { payload }: RegisterUser) {
    const locale: string = this.localizationService.getLocalization();
    const params = new HttpParams()
      .set('locale', locale)
      .set('redirectUrl', location.href.replace('registration', 'auth/activation'));
    this.httpClient
      .post<void>('http://localhost:8080/api/v1/auth/register', payload, { params: params })
      .pipe(
        catchError(error => {
          console.log(error);
          dispatch(new ShowMessageBar({ message: error, type: 'error' }));
          return EMPTY;
        })
      )
      .subscribe(response => {
        if (response === null) {
          dispatch(new ShowMessageBar({ message: 'Unexpected error', type: 'error' }));
        } else {
          this.router.navigate(['/confirmation']);
        }
      });
  }
}
