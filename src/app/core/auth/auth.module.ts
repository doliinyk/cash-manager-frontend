import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NgxsModule } from '@ngxs/store';
import { MaterialModule } from 'shared/modules/material.module';
import { AuthState } from 'shared/store/auth/auth.state';
import { RegistrationState } from 'shared/store/registration/registration.state';
import { AuthRoutingModule } from './auth-routing.module';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailActivationComponent,
    EmailConfirmationComponent,
    ForgotPasswordComponent
  ],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgxsModule.forFeature([RegistrationState, AuthState]),
    AuthRoutingModule
  ]
})
export class AuthModule {}
