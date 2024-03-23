import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Languages} from "../models/languages";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  isSmallScreen = false;

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    if (this.getLanguage() != null) {
      this.translate.use(<string>this.getLanguage());
    } else {
      this.translate.use(Languages.uk);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', Languages.uk);
      }
    }
  }

  constructor(private translate: TranslateService, private breakpointObserver: BreakpointObserver) {

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isMenuOpen = false;
}
