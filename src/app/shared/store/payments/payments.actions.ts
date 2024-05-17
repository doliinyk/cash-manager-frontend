import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';

export class GetPayments {
  static readonly type = '[payments] get';

  constructor(public url: string) {}
}

export class GetAllPayments {
  static readonly type = '[payments] get all';
}

export class CreateExpensePayment {
  static readonly type = '[payment] create expense';

  constructor(
    public url: string,
    public payment: ExpenseStateModel
  ) {}
}

export class CreateIncomePayment {
  static readonly type = '[payment] create income';

  constructor(
    public url: string,
    public payment: IncomeStateModel
  ) {}
}
