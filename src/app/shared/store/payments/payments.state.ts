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
    allIncomes: []
  }
})
@Injectable()
export class PaymentsState {
  @Selector()
  static payments(state: PaymentsStateModel) {
    return state;
  }

  @Selector()
  static allPayments(state: PaymentsStateModel) {
    return state.allExpenses.concat(state.allIncomes);
  }

  @Selector()
  static allExpenses(state: PaymentsStateModel) {
    return state.allExpenses;
  }

  @Selector()
  static allIncomes(state: PaymentsStateModel) {
    return state.allIncomes;
  }

  constructor(private httpClient: HttpClient) {}

  @Action(GetExpenses)
  getExpenses({ patchState }: StateContext<PaymentsStateModel>, { url }: GetExpenses) {
    return this.httpClient.get<ExpensePayload>(`${url}?page=0&size=5&sort=string`).pipe(
      tap((payload: ExpensePayload) => {
        patchState({
          allExpenses: payload.content
        });
      })
    );
  }

  @Action(GetIncomes)
  getIncomes({ patchState }: StateContext<PaymentsStateModel>, { url }: GetIncomes) {
    return this.httpClient.get<ExpensePayload>(`${url}?page=0&size=5&sort=true`).pipe(
      tap((payload: IncomePayload) => {
        patchState({
          allIncomes: payload.content
        });
      })
    );
  }

  @Action(GetAllPayments)
  getAllPayments({ dispatch }: StateContext<PaymentsStateModel>) {
    dispatch(new GetExpenses(Payments.expenses));
    dispatch(new GetIncomes(Payments.incomes));
  }

  @Action(CreateExpensePayment)
  createExpensePayment({ dispatch }: StateContext<ExpenseStateModel>, { url, payment }: CreateExpensePayment) {
    return this.httpClient
      .post<ExpenseStateModel>(url, payment)
      .pipe(tap(() => dispatch(new GetExpenses(Payments.expenses))));
  }

  @Action(CreateIncomePayment)
  createIncomePayment({ dispatch }: StateContext<IncomeStateModel>, { url, payment }: CreateIncomePayment) {
    return this.httpClient
      .post<IncomeStateModel>(url, payment)
      .pipe(tap(() => dispatch(new GetIncomes(Payments.incomes))));
  }
}
