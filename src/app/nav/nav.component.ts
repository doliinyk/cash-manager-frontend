import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Languages} from "../models/languages";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  ngOnInit() {
    if (this.getLanguage() != null) {
      this.translate.use(<string>this.getLanguage());
    } else {
      this.translate.use(Languages.uk);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', Languages.uk);
      }
    }
  }

  constructor(private translate: TranslateService) {

  }

  useLanguage(language: Languages): void {
    localStorage.setItem('language', language);
    this.translate.use(language);
  }

  getLanguage(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('language');
    }
    return null;
  }

  protected readonly Languages = Languages;
}
