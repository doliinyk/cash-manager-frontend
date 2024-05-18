import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, Validators} from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { CategoriesService } from 'shared/services/categories/categories.service';
import { PaymentsService } from 'shared/services/payments/payments.service';
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { Payments } from 'shared/enums/payments';
import { IncomeStateModel } from 'shared/models/income-payment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";

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
  selectedCategories: Observable<CategoryStateModel[]>;

  transactionField = new FormControl('', Validators.required);
  nameField = new FormControl('', Validators.required);
  categoryField = new FormControl('', Validators.required);
  amountField = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  dateField = new FormControl('', [Validators.required, this.dateValidator]);
  formGroup = this._formBuilder.group({
    transactionType: this.transactionField,
    name: this.nameField,
    category: this.categoryField,
    amount: this.amountField,
    date: this.dateField
  });

  categories: CategoryStateModel[] = [];
  private subcription: Subscription;

  displayedColumns: string[] = ['category', 'description', 'date', 'amount'];
  dataSource: MatTableDataSource<ExpenseStateModel>;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  searchField = new FormControl('');

  transactionTypes: TransactionType[] = [
    { value: 'income-0', viewValue: 'Прибуток' },
    { value: 'expense-1', viewValue: 'Витрата' },
    { value: 'regular-2', viewValue: 'Регулярний' }
  ];

  ngOnInit() {
    this.paymentService.getAllPayments();
    // this.paymentService.allExpenses$.subscribe(data => {
    //   this.dataSource.data = data;
    //   this.dataSource.paginator = this.paginator;
    // });
    this.subcription = this.categoriesService.allCategories$.subscribe(categories => (this.categories = categories));
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    protected categoriesService: CategoriesService,
    protected paymentService: PaymentsService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  onTransactionChanged(event: string) {
    this.selectedCategories =
      event === 'income-0' ? this.categoriesService.incomeCategories$ : this.categoriesService.expenseCategories$;
  }

  onSubmit() {
    const transactionData = this.formGroup.value;
    if (this.transactionField.value === this.transactionTypes[0].value) {
      const incomeData: IncomeStateModel = {
        description: transactionData.name,
        profit: +transactionData.amount,
        incomeDate: new Date(transactionData.date).toISOString(),
        category: { title: transactionData.category }
      };
      console.log(incomeData);
      this.paymentService.createIncomePayment(Payments.incomes, incomeData);
    } else {
      const expenseData: ExpenseStateModel = {
        description: transactionData.name,
        cost: +transactionData.amount,
        expensesDate: new Date(transactionData.date).toISOString(),
        category: { title: transactionData.category }
      };
      console.log(expenseData);
      this.paymentService.createExpensePayment(Payments.expenses, expenseData);
    }
  }

  onPageChange(event: PageEvent, type: string) {
    if (type === 'expense') this.paymentService.getExpenses(Payments.expenses, event.pageIndex, event.pageSize);
    else if (type === 'incomes') this.paymentService.getIncomes(Payments.incomes, event.pageIndex, event.pageSize);
  }

  getColorByTitle(categoryTitle: string) {
    let color = '#ffffff';
    const category = this.categories.find(cat => cat.title === categoryTitle);
    if (category) {
      color = category.colorCode;
    }
    return color;
  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const currentDate = new Date();
    if (control.value && new Date(control.value) > currentDate) {
      return { 'invalidDate': true };
    }
    return null;
  }

  getDateByISO(date: string) {
    return `${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`;
  }
}
