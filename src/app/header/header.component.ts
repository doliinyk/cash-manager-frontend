import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Subject, takeUntil} from "rxjs";

import {Languages} from "../shared/enums/languages";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected readonly Object = Object;
  protected readonly Languages = Languages;
  protected isSmallScreen = false;
  protected language: string = "uk";
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly translateService: TranslateService,
    private readonly breakpointObserver: BreakpointObserver
  ) {
  }

  public ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => this.isSmallScreen = result.matches);
    this.useLanguage(this.getLanguage() as Languages);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
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
