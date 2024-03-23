import { Component } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrl: './title-bar.component.scss'
})
export class TitleBarComponent {
  selectedLanguage: string = 'Українська';
  changeLanguage(language: string): void {
    this.selectedLanguage = language
  }
}
