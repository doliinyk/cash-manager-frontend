import {CategoryStateModel} from "shared/models/category";

export interface IncomeStateModel {
  description?: string;
  cost?: number;
  incomeDate?: string;
  category?: CategoryStateModel;
}
