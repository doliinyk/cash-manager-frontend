import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CategoryStateModel } from 'shared/models/category';
import { CategoriesStateModel } from 'shared/models/categories';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  CreateCategory,
  DeleteCategory,
  GetAllCategories,
  GetCategories
} from 'shared/store/category/category.actions';
import { CategoryPayload } from 'shared/models/category-payload';
import { tap } from 'rxjs';
import { Categories } from 'shared/enums/categories';

@State<CategoriesStateModel>({
  name: 'category',
  defaults: {
    incomeCategories: [],
    expenseCategories: []
  }
})
@Injectable()
export class CategoryState {
  @Selector()
  static categories(state: CategoriesStateModel) {
    return state;
  }

  @Selector()
  static allCategories(state: CategoriesStateModel) {
    return state.expenseCategories.concat(state.incomeCategories);
  }

  @Selector()
  static incomeCategories(state: CategoriesStateModel) {
    return state.incomeCategories;
  }

  @Selector()
  static expenseCategories(state: CategoriesStateModel) {
    return state.expenseCategories;
  }

  constructor(private httpClient: HttpClient) {}

  @Action(GetCategories)
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

  @Action(GetAllCategories)
  getAllCategories({ dispatch }: StateContext<CategoryStateModel>) {
    dispatch(new GetCategories(Categories.expenses));
    dispatch(new GetCategories(Categories.incomes));
  }

  @Action(CreateCategory)
  createCategory({ dispatch }: StateContext<CategoryStateModel>, { url, category }: CreateCategory) {
    return this.httpClient.post<CategoryStateModel>(url, category).pipe(tap(() => dispatch(new GetAllCategories())));
  }

  @Action(DeleteCategory)
  deleteCategory({ dispatch }: StateContext<CategoryStateModel>, { url, category }: DeleteCategory) {
    const headers = new HttpHeaders({
      Accept: '*/*',
      'Content-Type': 'application/json'
    });
    return this.httpClient
      .delete(url, { headers: headers, body: { title: category.title } })
      .pipe(tap(() => dispatch(new GetAllCategories())));
  }
}
