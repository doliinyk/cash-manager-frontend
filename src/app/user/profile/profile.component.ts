import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Observable, Subscription } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { UserStateModel } from 'shared/models/user';
import { AuthService } from 'shared/services/auth/auth.service';
import { CategoryExpenseService } from 'shared/services/user/category.expense.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  protected user?: Observable<UserStateModel> = this.authService.user$;
  isEditMode: boolean = false;
  userName?: string;
  userEmail?: string;
  tempUserName?: string = '';
  tempUserEmail?: string = '';
  categories: CategoryStateModel[] = [];
  subscription: Subscription | undefined;

  openPasswordDialog() {
    this.dialog.open(PasswordDialogComponent);
  }

  openCategoryDialog() {
    this.dialog.open(CategoryDialogComponent);
  }

  public ngOnInit(): void {
    this.user?.subscribe(data => {
      this.userName = data.login?.toString();
      this.userEmail = data.email;
    });
    this.subscription = this.categoryService.categories$.subscribe(categories => {
      this.categories = categories;
    });
  }

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  constructor(
    private authService: AuthService,
    protected categoryService: CategoryExpenseService,
    private dialog: MatDialog
  ) {}

  toEditMode() {
    this.tempUserName = this.userName;
    this.tempUserEmail = this.userEmail;
    this.isEditMode = true;
  }

  saveChanges() {
    this.isEditMode = false;
  }

  declineChanges() {
    this.userName = this.tempUserName;
    this.userEmail = this.tempUserEmail;
    this.isEditMode = false;
  }
}
