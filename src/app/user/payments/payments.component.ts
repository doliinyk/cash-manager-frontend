import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { CategoriesService } from 'shared/services/categories/categories.service';

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
  }

  public ngOnDestroy(): void {
  }

  onTransactionChanged(event: string) {
    this.selectedCategories = event === 'income-0' ? this.categoriesService.incomeCategories$ : this.categoriesService.expenseCategories$;
  }

  onSubmit() {
    const transactionData = this.formGroup.value;
    console.log(transactionData);
  }

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    protected categoriesService: CategoriesService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
}
