import { CategoryStateModel } from 'shared/models/category';

export interface IncomeStateModel {
  description?: string;
  profit?: number;
  incomeDate?: string;
  category?: CategoryStateModel;
}
