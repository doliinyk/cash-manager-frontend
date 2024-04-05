import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MaterialModule } from 'shared/modules/material.module';
import { EmailActivationComponent } from './email-activation/email-activation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, EmailActivationComponent],
  exports: [LoginComponent, RegisterComponent],
  imports: [CommonModule, MaterialModule, TranslateModule, FlexLayoutModule, RouterLink, NgOptimizedImage]
})
export class AuthModule {}
