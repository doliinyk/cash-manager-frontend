import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import {EmailConfirmationComponent} from "./email-confirmation/email-confirmation.component";

const routes: Routes = [
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'activation', component: EmailActivationComponent },
  { path: 'confirmation', component: EmailConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
