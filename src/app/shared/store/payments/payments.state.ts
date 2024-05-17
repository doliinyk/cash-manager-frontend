import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CategoryStateModel } from 'shared/models/category';
import { CategoriesStateModel } from 'shared/models/categories';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateCategory, GetAllCategories, GetCategories } from 'shared/store/category/category.actions';
import { CategoryPayload } from 'shared/models/category-payload';
import { tap } from 'rxjs';
import { Categories } from 'shared/enums/categories';
import {PaymentsStateModel} from "shared/models/payments";
import {GetPayments} from "shared/store/payments/payments.actions";

@State<PaymentsStateModel>({
  name: 'payment',
  defaults: {
    allExpenses: [],
    allIncomes: []
  }
})
@Injectable()
export class PaymentsState {
  @Selector()
  static payments(state: PaymentsStateModel) {
    return state;
  }

  @Selector()
  static allPayments(state: PaymentsStateModel) {
    return state.allExpenses.concat(state.allIncomes);
  }

  @Selector()
  static allExpenses(state: PaymentsStateModel) {
    return state.allExpenses;
  }

  @Selector()
  static allIncomes(state: PaymentsStateModel) {
    return state.allIncomes;
  }

  constructor(private httpClient: HttpClient) {}

  @Action(GetPayments)
  getCategories({ patchState }: StateContext<CategoriesStateModel>, { url }: GetCategories) {
    return this.httpClient.get<CategoryPayload[]>(url).pipe(
      tap((payload: CategoryPayload[]) => {
        const categories: CategoryStateModel[] = Object.keys(payload).map(colorCode => ({
          colorCode: this.hexToRgbA(colorCode),
          title: payload[colorCode].title
        }));
        if (Categories.incomes === url)
          patchState({
            incomeCategories: categories
          });
        else
          patchState({
            expenseCategories: categories
          });
      })
    );
  }

  @Action(GetAllCategories)
  getAllCategories({ dispatch }: StateContext<CategoryStateModel>) {
    dispatch(new GetCategories(Categories.expenses));
    dispatch(new GetCategories(Categories.incomes));
  }

  hexToRgbA(hex: string | undefined) {
    if (hex) {
      hex.slice(0, 1);
      const r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 0.5 + ')';
    }
    return hex;
  }

  @Action(CreateCategory)
  createCategory({ dispatch }: StateContext<CategoryStateModel>, { url, category }: CreateCategory) {
    return this.httpClient.post<CategoryStateModel>(url, category).pipe(tap(() => dispatch(new GetAllCategories())));
  }
}
