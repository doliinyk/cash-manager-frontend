import {Component} from "@angular/core";
import {TestBed} from '@angular/core/testing';
import {BrowserModule} from "@angular/platform-browser";
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule
      ],
      declarations: [
        AppComponent,
        MockNavComponent,
        MockFooterComponent
      ],
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
export class MockNavComponent {
}

@Component({
  selector: 'app-footer',
  template: ''
})
export class MockFooterComponent {
}
