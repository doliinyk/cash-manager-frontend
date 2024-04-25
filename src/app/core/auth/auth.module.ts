import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'shared/modules/material.module';
import { RegistrationState } from 'shared/store/registration/registration.state';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import {UserState} from "shared/store/user/user.state";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EmailActivationComponent],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
    NgxsModule.forFeature([RegistrationState, UserState]),
    AuthRoutingModule
  ]
})
export class AuthModule {}
