import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import {RegularStateModel} from "shared/models/regular-payment";

export interface PaymentsStateModel {
  allExpenses: ExpenseStateModel[];
  allIncomes: IncomeStateModel[];
  allRegulars: RegularStateModel[];
  totalExpenses: number;
  totalIncomes: number;
  totalRegulars: number;
}
