import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action, StateContext } from '@ngxs/store';
import { MessageBarComponent } from 'shared/components/message-bar/message-bar.component';
import { ShowMessageBar, UserIsAuth } from 'shared/store/app/app.actions';
import { GetUser } from 'shared/store/auth/auth.actions';

@Injectable()
export class AppState {
  constructor(private snackBar: MatSnackBar) {}

  @Action(ShowMessageBar)
  showMessageBar(_context: StateContext<void>, { payload }: ShowMessageBar): void {
    const duration = payload.infinityDuration || payload.duration === null ? undefined : payload.duration || 5000;

    this.snackBar.openFromComponent(MessageBarComponent, {
      duration,
      verticalPosition: payload.verticalPosition || 'top',
      horizontalPosition: payload.horizontalPosition || 'center',
      panelClass: payload.type,
      data: payload
    });
  }

  @Action(UserIsAuth)
  userIsAuth({ dispatch }: StateContext<void>): void {
    if (localStorage.getItem('accessToken') !== null) {
      dispatch(new GetUser());
    }
  }
}
