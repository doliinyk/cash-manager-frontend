import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, BrowserModule],
      declarations: [AppComponent, MockHeaderComponent, MockFooterComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

@Component({
  selector: 'app-header',
  template: ''
})
export class MockHeaderComponent {}

@Component({
  selector: 'app-footer',
  template: ''
})
export class MockFooterComponent {}
