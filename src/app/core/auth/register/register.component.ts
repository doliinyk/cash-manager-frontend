import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'shared/services/auth/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.pattern('^(?=.*[a-zA-Z])\\w{3,30}$'), Validators.nullValidator]],
      email: ['', [Validators.required, Validators.email, Validators.nullValidator]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40), Validators.nullValidator]]
    });
  }

  submitForm() {
    this.registrationService.registration(this.registerForm.value);
    this.router.navigate(['/test']);
  }
}
