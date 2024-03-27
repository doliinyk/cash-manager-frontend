import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginComponent} from "./core/auth/login/login.component";
import {RegisterComponent} from "./core/auth/register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {PaymentsComponent} from "./payments/payments.component";
import {SupportComponent} from "./support/support.component";
import {AccountRecoverComponent} from "./account-recover/account-recover.component";


export const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: 'recover',
    component: AccountRecoverComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
