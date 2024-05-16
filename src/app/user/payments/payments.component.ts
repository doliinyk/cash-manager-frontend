import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { CategoryExpenseService } from 'shared/services/user/category.expense.service';
import { CategoryIncomeService } from 'shared/services/user/category.income.service';

interface TransactionType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit, OnDestroy {
  stepperOrientation: Observable<StepperOrientation>;
  expenseCategories: CategoryStateModel[] = [];
  incomeCategories: CategoryStateModel[] = [];
  allCategories: CategoryStateModel[] = [];
  selectedCategories: CategoryStateModel[] = [];
  expenseCategoriesSubscription: Subscription | undefined;
  incomeCategoriesSubscription: Subscription | undefined;
  transactionField = new FormControl('', Validators.required);
  nameField = new FormControl('', Validators.required);
  categoryField = new FormControl('', Validators.required);
  amountField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  dateField = new FormControl('', Validators.required);
  formGroup = this._formBuilder.group({
    transactionType: this.transactionField,
    name: this.nameField,
    category: this.categoryField,
    amount: this.amountField,
    date: this.dateField
  });

  searchField = new FormControl('');

  transactionTypes: TransactionType[] = [
    { value: 'income-0', viewValue: 'Прибуток' },
    { value: 'expense-1', viewValue: 'Витрата' },
    { value: 'regular-2', viewValue: 'Регулярний' }
  ];

  public ngOnInit(): void {
    this.expenseCategoriesSubscription = this.categoryExpenseService.categories$.subscribe(categories => {
      this.expenseCategories = categories;
      this.allCategories = this.incomeCategories.concat(this.expenseCategories);
    });
    this.incomeCategoriesSubscription = this.categoryIncomeService.categories$.subscribe(categories => {
      this.incomeCategories = categories;
      this.allCategories = this.expenseCategories.concat(this.incomeCategories);
    });
  }

  public ngOnDestroy(): void {
    this.expenseCategoriesSubscription?.unsubscribe();
    this.incomeCategoriesSubscription?.unsubscribe();
  }

  onTransactionChanged(event: string) {
    this.selectedCategories = event === 'income-0' ? this.incomeCategories : this.expenseCategories;
  }

  onSubmit() {
    const transactionData = this.formGroup.value;
    console.log(transactionData);
  }

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private categoryExpenseService: CategoryExpenseService,
    private categoryIncomeService: CategoryIncomeService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
}
