import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLayoutComponent } from './login-layout.component';
import { HeaderComponent } from "../../core/layout/header/header.component";
import { FooterComponent } from "../../core/layout/footer/footer.component";
import { AuthComponent } from "../../core/auth/auth.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";



describe('LoginLayoutComponent', () => {
  let component: LoginLayoutComponent;
  let fixture: ComponentFixture<LoginLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginLayoutComponent,
        HeaderComponent,
        FooterComponent,
        AuthComponent,
      ],
      imports: [ MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
