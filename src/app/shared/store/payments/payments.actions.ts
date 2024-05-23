import {HttpParams} from "@angular/common/http";
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';

export class GetExpenses {
  static readonly type = '[payments] get expenses';

  constructor(
    public url: string,
    public page: number,
    public size: number
  ) {}
}

export class GetIncomes {
  static readonly type = '[payments] get incomes';

  constructor(
    public url: string,
    public page: number,
    public size: number
  ) {}
}

export class GetExpenseRegulars {
  static readonly type = '[payments] get expense regulars';

  constructor(
    public url: string,
    public page: number,
    public size: number
  ) {}
}

export class GetIncomeRegulars {
  static readonly type = '[payments] get income regulars';

  constructor(
    public url: string,
    public page: number,
    public size: number
  ) {}
}

export class GetAllPayments {
  static readonly type = '[payments] get all';

  constructor(
    public page: number,
    public size: number
  ) {}
}

export class GetExpensesByFilterParams {
  static readonly type = '[payments] get expenses by filter params';

  constructor(
    public url: string,
    public params: HttpParams
  ) {}
}

export class GetIncomesByFilterParams {
  static readonly type = '[payments] get incomes by filter params';

  constructor(
    public url: string,
    public params: HttpParams
  ) {}
}

export class GetExpensesByDate {
  static readonly type = '[payments] get expenses by date';

  constructor(
    public url: string,
    public page: number,
    public size: number,
    public fromByDate: string,
    public toByDate: string
  ) {}
}

export class GetIncomesByDate {
  static readonly type = '[payments] get incomes by date';

  constructor(
    public url: string,
    public page: number,
    public size: number,
    public fromByDate: string,
    public toByDate: string
  ) {}
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

export class CreateExpenseRegularPayment {
  static readonly type = '[payment] create expense regular';

  constructor(
    public url: string,
    public payment: IncomeStateModel
  ) {}
}

export class CreateIncomeRegularPayment {
  static readonly type = '[payment] create income regular';

  constructor(
    public url: string,
    public payment: IncomeStateModel
  ) {}
}
