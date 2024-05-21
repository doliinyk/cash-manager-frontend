import { CategoryStateModel } from 'shared/models/category';

export interface IncomeRegularStateModel {
  periodicity?: number;
  title?: string;
  description?: string;
  profit?: number;
  lastPaymentDate?: string;
  category?: CategoryStateModel;
}
