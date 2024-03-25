import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FlexLayoutServerModule} from "@angular/flex-layout/server";
import {RegisterPageComponent } from './register-page/register-page.component';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButton, MatFabButton} from "@angular/material/button";
import {TitleBarComponent } from './title-bar/title-bar.component';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {RegisterFooterComponent } from './register-footer/register-footer.component';
import {LoginLayoutComponent } from './Login/login-layout/login-layout.component';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    TitleBarComponent,
    RegisterFooterComponent,
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
