import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { pipe, take } from 'rxjs';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.scss'
})
export class PasswordDialogComponent {
  userPasswordCurrent: string;
  userPasswordNew: string;

  onChangePassword() {
    if (this.userPasswordCurrent && this.userPasswordNew) {
      return this.http
        .patch<any>('http://localhost:8080/api/v1/user/password', {
          oldPassword: this.userPasswordCurrent,
          newPassword: this.userPasswordNew
        })
        .subscribe(pipe(take(1), response => console.log(response)));
    }
    return null;
  }

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    private http: HttpClient
  ) {}
}
