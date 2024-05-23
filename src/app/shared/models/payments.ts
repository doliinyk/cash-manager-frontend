import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import { ExpenseRegularStateModel } from 'shared/models/regular-expense-payment';
import { IncomeRegularStateModel } from 'shared/models/regular-income-payments';

export interface PaymentsStateModel {
  allExpenses: ExpenseStateModel[];
  allIncomes: IncomeStateModel[];
  allExpenseRegulars: ExpenseRegularStateModel[];
  allIncomeRegulars: IncomeRegularStateModel[];
  totalExpenses: number;
  totalIncomes: number;
  totalExpenseRegulars: number;
  totalIncomeRegulars: number;
}
