import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Component, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

import {Languages} from "../shared/enums/languages";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  protected readonly Object = Object;
  protected readonly Languages = Languages;
  protected isSmallScreen = false;
  protected language: string = "uk";

  constructor(
    private readonly translateService: TranslateService,
    private readonly breakpointObserver: BreakpointObserver
  ) {
  }

  public ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    this.useLanguage(this.getLanguage() as Languages);
  }

  public useLanguage(language: string): void {
    localStorage.setItem('language', language);
    this.translateService.use(language);
    this.language = language;
  }

  public getLanguage(): string {
    return localStorage.getItem('language') || 'uk';
  }
}
