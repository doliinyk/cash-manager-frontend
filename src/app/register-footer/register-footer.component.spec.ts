import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFooterComponent } from './register-footer.component';

describe('RegisterFooterComponent', () => {
  let component: RegisterFooterComponent;
  let fixture: ComponentFixture<RegisterFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
