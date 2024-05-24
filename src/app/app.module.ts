import { NgOptimizedImage } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { MessageBarComponent } from 'shared/components/message-bar/message-bar.component';
import { MaterialModule } from 'shared/modules/material.module';
import { TokenInterceptor } from 'shared/services/auth/token.interceptor';
import { AppState } from 'shared/store/app/app.state';
import { CategoryState } from 'shared/store/category/category.state';
import { PaymentsState } from 'shared/store/payments/payments.state';
import { TokenState } from 'shared/store/token/token.state';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './core/auth/auth.module';
import { MainComponent } from './core/main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DevinfoComponent } from './devinfo/devinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    MessageBarComponent,
    DevinfoComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      useDefaultLang: true,
      defaultLanguage: localStorage.getItem('language') || 'uk'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    NgxsModule.forRoot([AppState, TokenState, CategoryState, PaymentsState]),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    AuthModule,
    FlexLayoutModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [[provideHttpClient(withInterceptors([TokenInterceptor]))]],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  const path = window.location.origin + '/assets/i18n/';
  return new TranslateHttpLoader(http, path, '.json');
}
