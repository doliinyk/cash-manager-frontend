import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activation', component: EmailActivationComponent },
  { path: 'confirmation', component: EmailConfirmationComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
