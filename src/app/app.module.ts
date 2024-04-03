import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {BrowserModule} from '@angular/platform-browser';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from "./shared/modules/material.module";
import {LoginComponent} from "./core/auth/login/login.component";
import {RegisterComponent} from "./core/auth/register/register.component";
import {FooterComponent} from "./core/layout/footer/footer.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
