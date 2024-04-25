import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { LocalizationService } from 'shared/services/localization/localization.service';
import { Languages } from 'shared/enums/languages';
import { Router } from '@angular/router';
import {AuthService} from "shared/services/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  protected readonly Object = Object;
  protected readonly Languages = Languages;
  protected isSmallScreen = false;
  protected language: string = 'uk';
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  protected currentRoute?: string;
  protected currentPage?: string;
  protected isAuthentificated = this.authService.isAuthorized;
  protected account = this.authService.account;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly localizationService: LocalizationService,
    private router: Router,
    private authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => (this.isSmallScreen = result.matches));
    this.useLanguage(this.localizationService.getLocalization() as Languages);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getCurrentPage() {
    return this.router.url;
  }

  public useLanguage(language: string): void {
    this.localizationService.setLocalization(language);
    this.language = language;
  }

  logout() {
    this.authService.logout();
  }
}
