import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { map, Observable } from 'rxjs';
import { UserStateModel } from 'shared/models/user';
import { AuthService } from 'shared/services/auth/auth.service';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { PasswordDialogComponent } from '../password-dialog/password-dialog.component';
import { CategoriesService } from 'shared/services/categories/categories.service';
import { PaymentsService } from 'shared/services/payments/payments.service';
import { ExpenseStateModel } from 'shared/models/expense-payment';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  protected user?: Observable<UserStateModel> = this.authService.user$;
  isEditMode: boolean = false;
  userName?: string;
  userEmail?: string;
  tempUserName?: string = '';
  tempUserEmail?: string = '';

  openPasswordDialog() {
    this.dialog.open(PasswordDialogComponent);
  }

  openCategoryDialog() {
    this.dialog.open(CategoryDialogComponent);
  }

  public ngOnInit(): void {
    this.categoriesService.getAllCategories();
    const now = new Date();
    const currentDate = now.toISOString();

    const previousYear = new Date();
    previousYear.setFullYear(now.getFullYear() - 1);
    const previousYearDate = previousYear.toISOString();
    this.paymentsService.getExpensesByDate(previousYearDate, currentDate);
    this.paymentsService.allExpenses$
      .pipe(map(expenses => this.aggregateExpensesByMonth(expenses)))
      .subscribe(monthlyExpenses => {
        console.log(monthlyExpenses);
      });
  }

  aggregateExpensesByMonth(expenses: ExpenseStateModel[]): { [key: string]: number } {
    return expenses.reduce(
      (acc, expense) => {
        const date = new Date(expense.expensesDate);
        const month = date.toLocaleString('en', { month: 'short' });

        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += expense.cost;
        return acc;
      },
      {} as { [key: string]: number }
    );
  }

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    protected categoriesService: CategoriesService,
    protected paymentsService: PaymentsService
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
