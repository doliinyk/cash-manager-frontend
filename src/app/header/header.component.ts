import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';

import { LocalizationService } from 'shared/services/localization/localization.service';
import { Languages } from 'shared/enums/languages';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
  protected currentRoute: string;
  protected currentPage: string;

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly localizationService: LocalizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.currentRoute = this.activatedRoute.snapshot.firstChild.routeConfig.path;
    });
  }

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

  isAuthentificated() {
    return this.currentRoute === 'auth' || this.currentRoute === 'home';
  }

  public useLanguage(language: string): void {
    this.localizationService.setLocalization(language);
    this.language = language;
  }
}
