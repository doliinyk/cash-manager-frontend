import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent} from "./core/layout/footer/footer.component";
import {AuthComponent} from "./core/auth/auth.component";
import {LoginLayoutComponent} from "./features/WIP-login-layout/login-layout.component";
import {HeaderComponent} from "./core/layout/header/header.component";
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
        FooterComponent,
        AuthComponent,
        LoginLayoutComponent,
        HeaderComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
