import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecoverComponent } from './account-recover.component';

describe('AccountRecoverComponent', () => {
  let component: AccountRecoverComponent;
  let fixture: ComponentFixture<AccountRecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountRecoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
