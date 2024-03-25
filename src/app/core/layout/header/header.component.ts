import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  selectedLanguage: string = 'Українська';

  protected changeLanguage(language: string): void {
    this.selectedLanguage = language;
  }
}
