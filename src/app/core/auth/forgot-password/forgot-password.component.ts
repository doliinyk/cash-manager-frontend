import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { LocalizationService } from 'shared/services/localization/localization.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private localizationService: LocalizationService
  ) {}

  responseMessage = '';
  emailField = new FormControl('', [Validators.required, Validators.email]);
  forgotGroup = this.formBuilder.group({
    email: this.emailField
  });

  sendData() {
    const emailData = this.forgotGroup.value;
    const locale: string = this.localizationService.getLocalization();
    const params = new HttpParams()
      .set('locale', locale)
      .set('redirectUrl', location.href.replace('/forgot-password', '/reset'));
    return this.http
      .post<void>(
        'http://localhost:8080/api/v1/auth/forgot',
        {
          email: emailData.email
        },
        { params: params }
      )
      .pipe(
        tap(() => {
          this.responseMessage = 'SUCCESS';
        }),
        catchError(err => {
          err.status === 404 ? (this.responseMessage = 'ERROR_USER') : this.responseMessage === 'ERROR';
          return err;
        })
      )
      .subscribe();
  }
}
