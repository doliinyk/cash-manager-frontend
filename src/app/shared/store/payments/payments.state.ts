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
  GetIncomes
} from 'shared/store/payments/payments.actions';
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import { ExpensePayload } from 'shared/models/expense-payments-payload';
import { IncomePayload } from 'shared/models/income-payments-payload';
import { Payments } from 'shared/enums/payments';

@State<PaymentsStateModel>({
  name: 'payment',
  defaults: {
    allExpenses: [],
    allIncomes: [],
    totalExpenses: undefined,
    totalIncomes: undefined
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
  static totalExpenses(state: PaymentsStateModel) {
    return state.totalExpenses;
  }

  @Selector()
  static totalIncomes(state: PaymentsStateModel) {
    return state.totalIncomes;
  }

  @Selector()
  static total(state: PaymentsStateModel) {
    return state.totalExpenses + state.totalIncomes;
  }

  constructor(private httpClient: HttpClient) {}

  @Action(GetExpenses)
  getExpenses({ patchState }: StateContext<PaymentsStateModel>, { url }: GetExpenses, page: number, size: number) {
    return this.httpClient.get<ExpensePayload>(`${url}?page=${page}&size=${size}&sort=expensesDate,DESC`).pipe(
      tap((payload: ExpensePayload) => {
        patchState({
          allExpenses: payload.content,
          totalExpenses: payload.totalElements
        });
      })
    );
  }

  @Action(GetIncomes)
  getIncomes({ patchState }: StateContext<PaymentsStateModel>, { url }: GetIncomes, page: number, size: number) {
    return this.httpClient.get<ExpensePayload>(`${url}?page=${page}&size=${size}&sort=incomeDate,DESC`).pipe(
      tap((payload: IncomePayload) => {
        patchState({
          allIncomes: payload.content,
          totalIncomes: payload.totalElements
        });
      })
    );
  }

  @Action(GetAllPayments)
  getAllPayments({ dispatch }: StateContext<PaymentsStateModel>, page: number, size: number) {
    dispatch(new GetExpenses(Payments.expenses, page, size));
    dispatch(new GetIncomes(Payments.incomes, page, size));
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
}
