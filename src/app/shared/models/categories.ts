import { CategoryStateModel } from 'shared/models/category';

export interface CategoriesStateModel {
  incomeCategories: CategoryStateModel[];
  expenseCategories: CategoryStateModel[];
}
