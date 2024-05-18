import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { PaymentsStateModel } from 'shared/models/payments';
import {
  CreateExpensePayment,
  CreateIncomePayment,
  GetAllPayments,
  GetExpenses,
  GetExpensesByDate,
  GetIncomes,
  GetIncomesByDate, GetRegulars
} from 'shared/store/payments/payments.actions';
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import { ExpensePayload } from 'shared/models/expense-payments-payload';
import { IncomePayload } from 'shared/models/income-payments-payload';
import { Payments } from 'shared/enums/payments';
import {RegularPayload} from "shared/models/regular-payments-payload";

@State<PaymentsStateModel>({
  name: 'payment',
  defaults: {
    allExpenses: [],
    allIncomes: [],
    allRegulars: [],
    totalExpenses: undefined,
    totalIncomes: undefined,
    totalRegulars: undefined
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
  static allRegulars(state: PaymentsStateModel) {
    return state.allRegulars;
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
  static totalRegulars(state: PaymentsStateModel) {
    return state.totalRegulars;
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

  @Action(GetRegulars)
  getRegulars({ patchState }: StateContext<PaymentsStateModel>, { url, size, page }: GetRegulars) {
    return this.httpClient.get<RegularPayload>(url, { params: { page, size, sort: 'lastPaymentDate,DESC' } }).pipe(
      tap((payload: RegularPayload) => {
        patchState({
          allRegulars: payload.content,
          totalRegulars: payload.totalElements
        });
      })
    );
  }

  @Action(GetAllPayments)
  getAllPayments({ dispatch }: StateContext<PaymentsStateModel>, page: number, size: number) {
    dispatch(new GetExpenses(Payments.expenses, page, size));
    dispatch(new GetIncomes(Payments.incomes, page, size));
    dispatch(new GetRegulars(Payments.regulars, page, size));
  }

  @Action(GetExpensesByDate)
  getExpensesByDate(
    { patchState }: StateContext<PaymentsStateModel>,
    { url, page, size, from, to }: GetExpensesByDate
  ) {
    return this.httpClient
      .get<ExpensePayload>(url, { params: { page, size, sort: 'expensesDate, DESC', from, to } })
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
  getIncomeByDate({ patchState }: StateContext<PaymentsStateModel>, { url, page, size, from, to }: GetIncomesByDate) {
    return this.httpClient.get<IncomePayload>(url, { params: { page, size, sort: 'indcome, DESC', from, to } }).pipe(
      tap((payload: ExpensePayload) => {
        patchState({
          allExpenses: payload.content,
          totalExpenses: payload.totalElements
        });
      })
    );
  }

  @Action(CreateExpensePayment)
  createExpensePayment({ dispatch }: StateContext<ExpenseStateModel>, { url, payment }: CreateExpensePayment) {
    return this.httpClient
      .post<ExpenseStateModel>(url, payment)
      .pipe(tap(() => dispatch(new GetExpenses(Payments.expenses, 1, 10))));
  }

  @Action(CreateIncomePayment)
  createIncomePayment({ dispatch }: StateContext<IncomeStateModel>, { url, payment }: CreateIncomePayment) {
    return this.httpClient
      .post<IncomeStateModel>(url, payment)
      .pipe(tap(() => dispatch(new GetIncomes(Payments.incomes, 1, 10))));
  }
}
