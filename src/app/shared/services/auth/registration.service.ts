import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { RegistrationStateModel } from 'shared/models/register';
import { RegisterUser } from 'shared/store/registration/registration.actions';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private readonly store: Store) {}

  public registration(payload: RegistrationStateModel) {
    return this.store.dispatch(new RegisterUser(payload));
  }
}
