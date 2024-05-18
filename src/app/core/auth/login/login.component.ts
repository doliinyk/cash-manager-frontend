import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])\\w{3,30}$'), Validators.nullValidator]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.nullValidator]]
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value);
  }
}
