import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FlexLayoutServerModule} from "@angular/flex-layout/server";
import { NavComponent } from './nav/nav.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatButton
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
