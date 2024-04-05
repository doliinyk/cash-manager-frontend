import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailActivationComponent } from './email-activation.component';

describe('EmailActivationComponent', () => {
  let component: EmailActivationComponent;
  let fixture: ComponentFixture<EmailActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailActivationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
