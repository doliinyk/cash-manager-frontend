import { CategoryStateModel } from 'shared/models/category';

export interface RegularStateModel {
  periodicity?: number;
  description?: string;
  cost?: number;
  lastPaymentDate?: string;
  category?: CategoryStateModel;
}
