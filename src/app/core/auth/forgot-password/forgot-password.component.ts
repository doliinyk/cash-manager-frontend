import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnDestroy {
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  subscription: Subscription;
  responseMessage = '';
  emailField = new FormControl('', [Validators.required, Validators.email]);
  forgotGroup = this.formBuilder.group({
    email: this.emailField
  });

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sendData() {
    const emailData = this.forgotGroup.value;
    this.subscription = this.http
      .post<string>('http://localhost:8080/api/v1/auth/forgot', {
        email: emailData.email
      })
      .subscribe(
        () => {
          this.responseMessage = 'SUCCESS';
        },
        error => {
          if (error.status === 404) {
            this.responseMessage = 'ERROR_USER';
          } else {
            this.responseMessage = 'ERROR';
          }
        }
      );
  }
}
