import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailActivationComponent } from './core/auth/email-activation/email-activation.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { MainComponent } from './core/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'email-activation', component: EmailActivationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
