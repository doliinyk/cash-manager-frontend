import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FlexLayoutServerModule} from "@angular/flex-layout/server";
import {AuthComponent } from './core/auth/auth.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButton, MatFabButton} from "@angular/material/button";
import {HeaderComponent } from './core/layout/header/header.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {FooterComponent } from './core/layout/footer/footer.component';
import {LoginLayoutComponent } from './Login/login-layout/login-layout.component';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    FooterComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatFormField,
    MatFormFieldModule,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatToolbar,
    MatToolbarModule,
    MatMenuItem,
    MatInput,
    MatLabel,
    FormsModule,
    MatFabButton,
    MatIcon,
    MatIconModule,
    MatInputModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
