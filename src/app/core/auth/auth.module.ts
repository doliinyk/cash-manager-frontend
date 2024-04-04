import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {MaterialModule} from 'shared/modules/material.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {TranslateModule} from "@ngx-translate/core";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule
  ]
})
export class AuthModule {
}
