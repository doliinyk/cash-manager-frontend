import { Component } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {map, Observable} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";

interface Categories {
  value: string;
  viewValue: string;
}

interface TransactionType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  nameField = new FormControl('');
  searchField = new FormControl('');

  categories: Categories[] = [
    { value: 'food-0', viewValue: 'Їжа' },
    { value: 'entertainmant-1', viewValue: 'Розваги' },
    { value: 'salary-2', viewValue: 'Заробітня плата' }
  ];

  transactionTypes: TransactionType[] = [
    { value: 'income-0', viewValue: 'Прибуток' },
    { value: 'expense-1', viewValue: 'Витрата' },
    { value: 'regular-2', viewValue: 'Регулярний' }
  ];

  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }
}
