import { CategoryStateModel } from 'shared/models/category';

export interface IncomeRegularStateModel {
  periodicity?: number;
  description?: string;
  profit?: number;
  lastPaymentDate?: string;
  category?: CategoryStateModel;
}
