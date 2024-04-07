import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'shared/modules/material.module';

import { EmailActivationComponent } from './email-activation.component';

describe('EmailActivationComponent', () => {
  let component: EmailActivationComponent;
  let fixture: ComponentFixture<EmailActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailActivationComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientModule, MaterialModule, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
