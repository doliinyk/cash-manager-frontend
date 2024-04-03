import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FlexLayoutServerModule} from "@angular/flex-layout/server";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from './core/layout/footer/footer.component';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {LoginComponent} from "./core/auth/login/login.component";
import {RegisterComponent} from "./core/auth/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatFormFieldModule,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatToolbarModule,
    MatMenuItem,
    MatLabel,
    FormsModule,
    MatFabButton,
    MatIconModule,
    MatInputModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
