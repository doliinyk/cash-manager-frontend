import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import {
  CreateExpensePayment,
  CreateIncomePayment,
  GetAllPayments,
  GetExpenses,
  GetExpensesByDate,
  GetIncomes,
  GetIncomesByDate, GetRegulars
} from 'shared/store/payments/payments.actions';
import { PaymentsState } from 'shared/store/payments/payments.state';
import { PaymentsStateModel } from 'shared/models/payments';
import { Payments } from 'shared/enums/payments';
import {RegularStateModel} from "shared/models/regular-payment";

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
  @Select(PaymentsState.allRegulars)
  public allRegulars$?: Observable<RegularStateModel[]>;
  @Select(PaymentsState.totalExpenses)
  public totalExpenses$?: Observable<number>;
  @Select(PaymentsState.totalIncomes)
  public totalIncomes$?: Observable<number>;
  @Select(PaymentsState.totalRegulars)
  public totalRegulars$?: Observable<number>;

  constructor(private readonly store: Store) {}

  getExpenses(page: number, size: number) {
    this.store.dispatch(new GetExpenses(Payments.expenses, page, size));
  }

  getIncomes(page: number, size: number) {
    this.store.dispatch(new GetIncomes(Payments.incomes, page, size));
  }

  getRegulars(page: number, size: number) {
    this.store.dispatch(new GetRegulars(Payments.regulars, page, size));
  }

  getAllPayments() {
    this.store.dispatch(new GetAllPayments(1, 10));
  }

  getExpensesByDate(from: string, to: string) {
    this.store.dispatch(new GetExpensesByDate(Payments.expenses, 1, 1000000, from, to));
  }

  getIncomesByDate(from: string, to: string) {
    this.store.dispatch(new GetIncomesByDate(Payments.incomes, 1, 1000000, from, to));
  }

  createExpensePayment(url: string, payment: ExpenseStateModel) {
    this.store.dispatch(new CreateExpensePayment(url, payment));
  }

  createIncomePayment(url: string, payment: IncomeStateModel) {
    this.store.dispatch(new CreateIncomePayment(url, payment));
  }
}
