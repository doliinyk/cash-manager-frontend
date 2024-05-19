import { CategoryStateModel } from 'shared/models/category';

export interface ExpenseRegularStateModel {
  periodicity?: number;
  title?: string;
  description?: string;
  cost?: number;
  lastPaymentDate?: string;
  category?: CategoryStateModel;
}
