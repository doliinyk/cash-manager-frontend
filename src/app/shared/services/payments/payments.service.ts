import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import {
  CreateExpensePayment,
  CreateExpenseRegularPayment,
  CreateIncomePayment,
  CreateIncomeRegularPayment,
  GetAllPayments,
  GetExpenseRegulars,
  GetExpenses,
  GetExpensesByDate,
  GetExpensesByDescription,
  GetIncomeRegulars,
  GetIncomes,
  GetIncomesByDate,
  GetIncomesByDescription
} from 'shared/store/payments/payments.actions';
import { PaymentsState } from 'shared/store/payments/payments.state';
import { PaymentsStateModel } from 'shared/models/payments';
import { Payments } from 'shared/enums/payments';
import { IncomeRegularStateModel } from 'shared/models/regular-income-payments';
import { ExpenseRegularStateModel } from 'shared/models/regular-expense-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  @Select(PaymentsState.payments)
  public payments$?: Observable<PaymentsStateModel>;
  @Select(PaymentsState.allExpenses)
  public allExpenses$?: Observable<ExpenseStateModel[]>;
  @Select(PaymentsState.allIncomes)
  public allIncomes$?: Observable<IncomeStateModel[]>;
  @Select(PaymentsState.allExpenseRegulars)
  public allExpenseRegulars$?: Observable<ExpenseRegularStateModel[]>;
  @Select(PaymentsState.allIncomeRegulars)
  public allIncomeRegulars$?: Observable<IncomeRegularStateModel[]>;
  @Select(PaymentsState.totalExpenses)
  public totalExpenses$?: Observable<number>;
  @Select(PaymentsState.totalIncomes)
  public totalIncomes$?: Observable<number>;
  @Select(PaymentsState.totalExpenseRegulars)
  public totalExpenseRegulars$?: Observable<number>;
  @Select(PaymentsState.totalIncomeRegulars)
  public totalIncomeRegulars$?: Observable<number>;

  constructor(private readonly store: Store) {}

  getExpenses(page: number, size: number) {
    this.store.dispatch(new GetExpenses(Payments.expenses, page, size));
  }

  getIncomes(page: number, size: number) {
    this.store.dispatch(new GetIncomes(Payments.incomes, page, size));
  }

  getExpenseRegulars(page: number, size: number) {
    this.store.dispatch(new GetExpenseRegulars(Payments.expenseregulars, page, size));
  }

  getIncomeRegulars(page: number, size: number) {
    this.store.dispatch(new GetIncomeRegulars(Payments.incomeregulars, page, size));
  }

  getAllPayments() {
    this.store.dispatch(new GetAllPayments(0, 10));
  }

  getExpensesByDescription(description: string) {
    this.store.dispatch(new GetExpensesByDescription(Payments.expenses, 0, 1000000, description));
  }

  getIncomesByDescription(description: string) {
    this.store.dispatch(new GetIncomesByDescription(Payments.incomes, 0, 1000000, description));
  }

  getExpensesByDate(from: string, to: string) {
    this.store.dispatch(new GetExpensesByDate(Payments.expenses, 0, 1000000, from, to));
  }

  getIncomesByDate(from: string, to: string) {
    this.store.dispatch(new GetIncomesByDate(Payments.incomes, 0, 1000000, from, to));
  }

  createExpensePayment(url: string, payment: ExpenseStateModel) {
    this.store.dispatch(new CreateExpensePayment(url, payment));
  }

  createIncomePayment(url: string, payment: IncomeStateModel) {
    this.store.dispatch(new CreateIncomePayment(url, payment));
  }

  createExpenseRegularPayment(url: string, payment: ExpenseRegularStateModel) {
    this.store.dispatch(new CreateExpenseRegularPayment(url, payment));
  }

  createIncomeRegularPayment(url: string, payment: IncomeRegularStateModel) {
    this.store.dispatch(new CreateIncomeRegularPayment(url, payment));
  }
}
