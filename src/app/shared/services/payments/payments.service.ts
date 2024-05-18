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
  GetIncomes
} from 'shared/store/payments/payments.actions';
import { PaymentsState } from 'shared/store/payments/payments.state';
import { PaymentsStateModel } from 'shared/models/payments';

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
  @Select(PaymentsState.totalExpenses)
  public totalExpenses$?: Observable<number>;
  @Select(PaymentsState.totalIncomes)
  public totalIncomes$?: Observable<number>;
  @Select(PaymentsState.total)
  public total$?: Observable<number>;

  constructor(private readonly store: Store) {}

  getExpenses(url: string, page: number, size: number) {
    this.store.dispatch(new GetExpenses(url, page, size));
  }

  getIncomes(url: string, page: number, size: number) {
    this.store.dispatch(new GetIncomes(url, page, size));
  }

  getAllPayments() {
    this.store.dispatch(new GetAllPayments(0, 10));
  }

  createExpensePayment(url: string, payment: ExpenseStateModel) {
    this.store.dispatch(new CreateExpensePayment(url, payment));
  }

  createIncomePayment(url: string, payment: IncomeStateModel) {
    this.store.dispatch(new CreateIncomePayment(url, payment));
  }
}
