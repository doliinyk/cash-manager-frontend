import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';

export interface PaymentsStateModel {
  allExpenses: ExpenseStateModel[];
  allIncomes: IncomeStateModel[];
  totalExpenses: number;
  totalIncomes: number;
}
