import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFooterComponent } from './register-footer.component';
import { MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";

describe('RegisterFooterComponent', () => {
  let component: RegisterFooterComponent;
  let fixture: ComponentFixture<RegisterFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterFooterComponent],
      imports: [MatIconModule, MatFormFieldModule
      ]
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
