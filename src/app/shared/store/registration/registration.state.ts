import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RegistrationStateModel } from 'shared/models/register';
import { LocalizationService } from 'shared/services/localization/localization.service';
import { RegisterUser } from 'shared/store/registration/registration.actions';

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
  registerUser(_context: StateContext<RegistrationStateModel>, { payload }: RegisterUser): Observable<void> {
    const locale: string = this.localizationService.getLocalization();
    const params = new HttpParams().set('locale', locale).set('redirectUrl', this.router.url);
    console.log(payload);
    return this.httpClient.post<void>('http://localhost:8080/api/v1/auth/register', payload, { params: params });
  }
}
