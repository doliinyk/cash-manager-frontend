import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './shared/modules/material.module';

@NgModule({
  declarations: [AppComponent, NavComponent, MainComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient]
      },
      useDefaultLang: true,
      defaultLanguage: localStorage.getItem('language') || 'uk'
    }),
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
