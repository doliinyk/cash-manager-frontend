import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RegisterFooterComponent} from "./register-footer/register-footer.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {LoginLayoutComponent} from "./login-layout/login-layout.component";
import {TitleBarComponent} from "./title-bar/title-bar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        MatIconModule
     ],
      declarations: [
        AppComponent,
        RegisterFooterComponent,
        RegisterPageComponent,
        LoginLayoutComponent,
        TitleBarComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
