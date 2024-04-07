import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { MaterialModule } from 'shared/modules/material.module';
import { RegistrationState } from 'shared/store/registration/registration.state';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthRoutingModule } from './auth-routing.module';

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
    NgxsModule.forFeature([RegistrationState]),
    AuthRoutingModule
  ]
})
export class AuthModule {}
