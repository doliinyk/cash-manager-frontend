import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((queryParam: Params) => {
      const userId = queryParam['userId'];
      const activationToken = queryParam['activationToken'];
      this.authService
        .verifyEmail(userId, activationToken)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.isVerified = true;
        });
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
