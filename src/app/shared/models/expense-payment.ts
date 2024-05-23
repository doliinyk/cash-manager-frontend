import { CategoryStateModel } from 'shared/models/category';

export interface ExpenseStateModel {
  description?: string;
  cost?: number;
  expensesDate?: string;
  category?: CategoryStateModel;
}
