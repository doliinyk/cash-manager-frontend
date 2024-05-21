import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { PaymentsStateModel } from 'shared/models/payments';
import {
  CreateExpensePayment,
  CreateExpenseRegularPayment,
  CreateIncomePayment,
  CreateIncomeRegularPayment,
  GetAllPayments,
  GetExpenseRegulars,
  GetExpenses,
  GetExpensesByDate,
  GetIncomeRegulars,
  GetIncomes,
  GetIncomesByDate
} from 'shared/store/payments/payments.actions';
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import { ExpensePayload } from 'shared/models/expense-payments-payload';
import { IncomePayload } from 'shared/models/income-payments-payload';
import { Payments } from 'shared/enums/payments';
import { ExpenseRegularPayload } from 'shared/models/regular-expense-payments-payload';
import { IncomeRegularPayload } from 'shared/models/regular-income-payments-payload';
import { IncomeRegularStateModel } from 'shared/models/regular-income-payments';
import { ExpenseRegularStateModel } from 'shared/models/regular-expense-payment';

@State<PaymentsStateModel>({
  name: 'payment',
  defaults: {
    allExpenses: [],
    allIncomes: [],
    allExpenseRegulars: [],
    allIncomeRegulars: [],
    totalExpenses: undefined,
    totalIncomes: undefined,
    totalExpenseRegulars: undefined,
    totalIncomeRegulars: undefined
  }
})
@Injectable()
export class PaymentsState {
  @Selector()
  static payments(state: PaymentsStateModel) {
    return state;
  }

  @Selector()
  static allExpenses(state: PaymentsStateModel) {
    return state.allExpenses;
  }

  @Selector()
  static allIncomes(state: PaymentsStateModel) {
    return state.allIncomes;
  }

  @Selector()
  static allExpenseRegulars(state: PaymentsStateModel) {
    return state.allExpenseRegulars;
  }

  @Selector()
  static allIncomeRegulars(state: PaymentsStateModel) {
    return state.allIncomeRegulars;
  }

  @Selector()
  static totalExpenses(state: PaymentsStateModel) {
    return state.totalExpenses;
  }

  @Selector()
  static totalIncomes(state: PaymentsStateModel) {
    return state.totalIncomes;
  }

  @Selector()
  static totalExpenseRegulars(state: PaymentsStateModel) {
    return state.totalExpenseRegulars;
  }

  @Selector()
  static totalIncomeRegulars(state: PaymentsStateModel) {
    return state.totalIncomeRegulars;
  }

  constructor(private httpClient: HttpClient) {}

  @Action(GetExpenses)
  getExpenses({ patchState }: StateContext<PaymentsStateModel>, { url, size, page }: GetExpenses) {
    return this.httpClient.get<ExpensePayload>(url, { params: { page, size, sort: 'expensesDate,DESC' } }).pipe(
      tap((payload: ExpensePayload) => {
        patchState({
          allExpenses: payload.content,
          totalExpenses: payload.totalElements
        });
      })
    );
  }

  @Action(GetIncomes)
  getIncomes({ patchState }: StateContext<PaymentsStateModel>, { url, size, page }: GetIncomes) {
    return this.httpClient.get<IncomePayload>(url, { params: { page, size, sort: 'incomeDate,DESC' } }).pipe(
      tap((payload: IncomePayload) => {
        patchState({
          allIncomes: payload.content,
          totalIncomes: payload.totalElements
        });
      })
    );
  }

  @Action(GetExpenseRegulars)
  getExpenseRegulars({ patchState }: StateContext<PaymentsStateModel>, { url, size, page }: GetExpenseRegulars) {
    return this.httpClient
      .get<ExpenseRegularPayload>(url, { params: { page, size, sort: 'lastPaymentDate,DESC' } })
      .pipe(
        tap((payload: ExpenseRegularPayload) => {
          patchState({
            allExpenseRegulars: payload.content,
            totalExpenseRegulars: payload.totalElements
          });
        })
      );
  }

  @Action(GetIncomeRegulars)
  getIncomeRegulars({ patchState }: StateContext<PaymentsStateModel>, { url, size, page }: GetIncomeRegulars) {
    return this.httpClient
      .get<IncomeRegularPayload>(url, { params: { page, size, sort: 'lastPaymentDate,DESC' } })
      .pipe(
        tap((payload: IncomeRegularPayload) => {
          patchState({
            allIncomeRegulars: payload.content,
            totalIncomeRegulars: payload.totalElements
          });
        })
      );
  }

  @Action(GetAllPayments)
  getAllPayments({ dispatch }: StateContext<PaymentsStateModel>, page: number, size: number) {
    dispatch(new GetExpenses(Payments.expenses, page, size));
    dispatch(new GetIncomes(Payments.incomes, page, size));
    dispatch(new GetExpenseRegulars(Payments.expenseregulars, page, size));
    dispatch(new GetIncomeRegulars(Payments.incomeregulars, page, size));
  }

  @Action(GetExpensesByDate)
  getExpensesByDate(
    { patchState }: StateContext<PaymentsStateModel>,
    { url, page, size, fromByDate, toByDate }: GetExpensesByDate
  ) {
    return this.httpClient
      .get<ExpensePayload>(url, { params: { page, size, sort: 'expensesDate, DESC', fromByDate, toByDate } })
      .pipe(
        tap((payload: ExpensePayload) => {
          patchState({
            allExpenses: payload.content,
            totalExpenses: payload.totalElements
          });
        })
      );
  }

  @Action(GetIncomesByDate)
  getIncomesByDate(
    { patchState }: StateContext<PaymentsStateModel>,
    { url, page, size, fromByDate, toByDate }: GetIncomesByDate
  ) {
    return this.httpClient
      .get<IncomePayload>(url, {
        params: {
          page,
          size,
          sort: 'incomeDate, DESC',
          fromByDate,
          toByDate
        }
      })
      .pipe(
        tap((payload: IncomePayload) => {
          patchState({
            allIncomes: payload.content,
            totalExpenses: payload.totalElements
          });
        })
      );
  }

  @Action(CreateExpensePayment)
  createExpensePayment({ dispatch }: StateContext<ExpenseStateModel>, { url, payment }: CreateExpensePayment) {
    return this.httpClient
      .post<ExpenseStateModel>(url, payment)
      .pipe(tap(() => dispatch(new GetExpenses(Payments.expenses, 0, 10))));
  }

  @Action(CreateIncomePayment)
  createIncomePayment({ dispatch }: StateContext<IncomeStateModel>, { url, payment }: CreateIncomePayment) {
    return this.httpClient
      .post<IncomeStateModel>(url, payment)
      .pipe(tap(() => dispatch(new GetIncomes(Payments.incomes, 0, 10))));
  }

  @Action(CreateExpenseRegularPayment)
  createExpenseRegularPayment(
    { dispatch }: StateContext<ExpenseRegularStateModel>,
    { url, payment }: CreateExpenseRegularPayment
  ) {
    return this.httpClient
      .post<ExpenseRegularStateModel>(url, payment)
      .pipe(tap(() => dispatch(new GetExpenseRegulars(Payments.expenseregulars, 0, 10))));
  }

  @Action(CreateIncomeRegularPayment)
  createIncomeRegularPayment(
    { dispatch }: StateContext<IncomeRegularStateModel>,
    { url, payment }: CreateIncomeRegularPayment
  ) {
    return this.httpClient
      .post<IncomeRegularStateModel>(url, payment)
      .pipe(tap(() => dispatch(new GetIncomeRegulars(Payments.incomeregulars, 0, 10))));
  }
}
