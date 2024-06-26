import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, Subscription } from 'rxjs';
import { Payments } from 'shared/enums/payments';
import { CategoryStateModel } from 'shared/models/category';
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import { ExpenseRegularStateModel } from 'shared/models/regular-expense-payment';
import { IncomeRegularStateModel } from 'shared/models/regular-income-payments';
import { CategoriesService } from 'shared/services/categories/categories.service';
import { PaymentsService } from 'shared/services/payments/payments.service';

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
  descriptionField = new FormControl('');
  periodicityField = new FormControl('30', Validators.maxLength(3));
  formGroup = this._formBuilder.group({
    transactionType: this.transactionField,
    name: this.nameField,
    descriptionRegular: this.descriptionField,
    category: this.categoryField,
    amount: this.amountField,
    date: this.dateField,
    periodicity: this.periodicityField
  });

  searchField = new FormControl('');
  categoryFilterField = new FormControl('');
  dateFromFilterField = new FormControl('');
  dateToFilterField = new FormControl('');
  sizeFromFilterField = new FormControl('');
  sizeToFilterField = new FormControl('');
  filterGroup = this._formBuilder.group({
    searchDescription: this.searchField,
    searchCategory: this.categoryFilterField,
    searchDateFrom: this.dateFromFilterField,
    searchDateTo: this.dateToFilterField,
    searchSizeFrom: this.sizeFromFilterField,
    searchSizeTo: this.sizeToFilterField
  });

  categories: CategoryStateModel[] = [];
  private subcription: Subscription;
  filterActive = false;

  displayedColumns: string[] = ['category', 'description', 'date', 'amount'];
  displayedColumnsRegular: string[] = ['category', 'title', 'description', 'date', 'periodicity', 'amount'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  transactionTypes: TransactionType[] = [
    { value: 'income-0', viewValue: 'Прибуток' },
    { value: 'expense-1', viewValue: 'Витрата' },
    { value: 'income-regular-2', viewValue: 'Прибуток-Регулярний' },
    { value: 'expense-regular-3', viewValue: 'Витрата-Регулярний' }
  ];

  ngOnInit() {
    let params = new HttpParams();
    params = params.set('page', 0);
    params = params.set('size', 10);
    params = params.set('sort', 'expensesDate,DESC');
    this.paymentService.getExpensesByFilterParams(params);
    params = params.set('sort', 'incomeDate,DESC');
    this.paymentService.getIncomesByFilterParams(params);
    this.paymentService.getExpenseRegulars(0, 10);
    this.paymentService.getIncomeRegulars(0, 10);
    this.updateTranslations();
    this.categoriesService.getAllCategories();
    this.subcription = this.categoriesService.allCategories$.subscribe(categories => (this.categories = categories));
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    protected categoriesService: CategoriesService,
    protected paymentService: PaymentsService,
    private translationService: TranslateService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  updateTranslations() {
    this.transactionTypes = [
      { value: 'income-0', viewValue: this.translationService.instant('PAYMENTS.income-0') },
      { value: 'expense-1', viewValue: this.translationService.instant('PAYMENTS.expense-1') },
      { value: 'income-regular-2', viewValue: this.translationService.instant('PAYMENTS.income-regular-2') },
      { value: 'expense-regular-3', viewValue: this.translationService.instant('PAYMENTS.expense-regular-3') }
    ];
  }

  onTransactionChanged(event: string) {
    this.selectedCategories =
      event === 'income-0' || event === 'income-regular-2'
        ? this.categoriesService.incomeCategories$
        : this.categoriesService.expenseCategories$;
  }

  onSubmit() {
    const transactionData = this.formGroup.value;
    switch (this.transactionField.value) {
      case this.transactionTypes[0].value: {
        const incomeData: IncomeStateModel = {
          description: transactionData.name,
          profit: +transactionData.amount,
          incomeDate: new Date(transactionData.date).toISOString(),
          category: { title: transactionData.category }
        };
        this.paymentService.createIncomePayment(Payments.incomes, incomeData);
        break;
      }
      case this.transactionTypes[1].value: {
        const expenseData: ExpenseStateModel = {
          description: transactionData.name,
          cost: +transactionData.amount,
          expensesDate: new Date(transactionData.date).toISOString(),
          category: { title: transactionData.category }
        };
        this.paymentService.createExpensePayment(Payments.expenses, expenseData);
        break;
      }
      case this.transactionTypes[2].value: {
        const incomeRegularData: IncomeRegularStateModel = {
          periodicity: +transactionData.periodicity,
          title: transactionData.name,
          description: transactionData.descriptionRegular,
          profit: +transactionData.amount,
          lastPaymentDate: new Date(transactionData.date).toISOString(),
          category: { title: transactionData.category }
        };
        this.paymentService.createIncomeRegularPayment(Payments.incomeregulars, incomeRegularData);
        break;
      }
      case this.transactionTypes[3].value: {
        const expenseRegularData: ExpenseRegularStateModel = {
          periodicity: +transactionData.periodicity,
          title: transactionData.name,
          description: transactionData.descriptionRegular,
          cost: +transactionData.amount,
          lastPaymentDate: new Date(transactionData.date).toISOString(),
          category: { title: transactionData.category }
        };
        this.paymentService.createExpenseRegularPayment(Payments.expenseregulars, expenseRegularData);
        break;
      }
    }
  }

  onSubmitFilter() {
    const transactionData = this.filterGroup.value;
    let params = new HttpParams();

    if (transactionData.searchDescription) {
      params = params.set('description', transactionData.searchDescription);
    }
    if (transactionData.searchCategory) {
      params = params.set('categoryTitle', transactionData.searchCategory);
    }
    if (transactionData.searchDateFrom) {
      params = params.set('fromByDate', new Date(transactionData.searchDateFrom).toISOString());
    }
    if (transactionData.searchDateTo) {
      params = params.set('toByDate', new Date(transactionData.searchDateTo).toISOString());
    }
    if (transactionData.searchSizeFrom) {
      params = params.set('fromBySize', transactionData.searchSizeFrom);
    }
    if (transactionData.searchSizeTo) {
      params = params.set('toBySize', transactionData.searchSizeTo);
    }
    params.set('page', this.paginator.pageIndex);
    params.set('size', this.paginator.pageSize);
    this.filterActive = true;
    this.paymentService.getExpensesByFilterParams(params);
    this.paymentService.getIncomesByFilterParams(params);
  }

  onClearFilters() {
    this.filterActive = false;
    this.filterGroup.reset({
      searchDescription: null,
      searchCategory: null,
      searchDateFrom: null,
      searchDateTo: null,
      searchSizeFrom: null,
      searchSizeTo: null
    });
    this.paymentService.getAllPayments();
  }

  onPageChange(event: PageEvent, type: string) {
    let params = new HttpParams();
    params = params.set('page', event.pageIndex);
    params = params.set('size', event.pageSize);
    if (this.filterActive) {
      const transactionData = this.filterGroup.value;
      if (transactionData.searchDescription) {
        params = params.set('description', transactionData.searchDescription);
      }
      if (transactionData.searchCategory) {
        params = params.set('categoryTitle', transactionData.searchCategory);
      }
      if (transactionData.searchDateFrom) {
        params = params.set('fromByDate', new Date(transactionData.searchDateFrom).toISOString());
      }
      if (transactionData.searchDateTo) {
        params = params.set('toByDate', new Date(transactionData.searchDateTo).toISOString());
      }
      if (transactionData.searchSizeFrom) {
        params = params.set('fromBySize', transactionData.searchSizeFrom);
      }
      if (transactionData.searchSizeTo) {
        params = params.set('toBySize', transactionData.searchSizeTo);
      }
    }
    switch (type) {
      case 'income': {
        params = params.set('sort', 'incomeDate,DESC');
        this.paymentService.getIncomesByFilterParams(params);
        break;
      }
      case 'expense': {
        params = params.set('sort', 'expensesDate,DESC');
        this.paymentService.getExpensesByFilterParams(params);
        break;
      }
      case 'income-regular': {
        this.paymentService.getIncomeRegulars(event.pageIndex, event.pageSize);
        break;
      }
      case 'expense-regular': {
        this.paymentService.getExpenseRegulars(event.pageIndex, event.pageSize);
        break;
      }
    }
  }

  getColorByTitle(categoryTitle: string) {
    let color = '#ffffff';
    const category = this.categories.find(cat => cat.title === categoryTitle);
    if (category) {
      color = category.colorCode;
    }
    return color;
  }

  dateValidator(control: AbstractControl): {
    [key: string]: any;
  } | null {
    const currentDate = new Date();
    if (control.value && new Date(control.value) > currentDate) {
      return { invalidDate: true };
    }
    return null;
  }

  getDateByISO(date: string) {
    return `${new Date(date).getDate()}.${new Date(date).getMonth() + 1}.${new Date(date).getFullYear()}`;
  }
}
