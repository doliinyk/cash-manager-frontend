import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'shared/services/auth/auth.service';

@Component({
  selector: 'app-email-activation',
  templateUrl: './email-activation.component.html',
  styleUrl: './email-activation.component.scss'
})
export class EmailActivationComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();
  protected isVerified: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  public ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap(paramMap => {
          const userId: string = paramMap.get('userId');
          const activationToken: string = paramMap.get('activationToken');
          return this.authService.verifyEmail(userId, activationToken);
        })
      )
      .subscribe(() => (this.isVerified = true));
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
