import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrl: './password-dialog.component.scss'
})
export class PasswordDialogComponent {
  userPasswordCurrent: string = '';
  userPasswordNew: string = '';

  isInvalid(): boolean {
    const hasMinimumLength = this.userPasswordCurrent.length >= 8 && this.userPasswordNew.length >= 8;

    const hasSameValues = this.userPasswordCurrent === this.userPasswordNew;

    return !hasMinimumLength || hasSameValues;
  }

  onChangePassword() {
    if (this.userPasswordCurrent && this.userPasswordNew) {
      this.http
        .patch<any>('http://localhost:8080/api/v1/user/password', {
          oldPassword: this.userPasswordCurrent,
          newPassword: this.userPasswordNew
        })
        .subscribe(response => console.log(response));
    }
  }

  constructor(
    public dialogRef: MatDialogRef<PasswordDialogComponent>,
    private http: HttpClient
  ) {}
}
