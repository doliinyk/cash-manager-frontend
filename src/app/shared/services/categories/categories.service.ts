import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CreateCategory, GetAllCategories, GetCategories } from 'shared/store/category/category.actions';
import { Observable } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { CategoryState } from 'shared/store/category/category.state';
import { CategoriesStateModel } from 'shared/models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  @Select(CategoryState.categories)
  public categories$?: Observable<CategoriesStateModel>;
  @Select(CategoryState.incomeCategories)
  public incomeCategories$?: Observable<CategoryStateModel[]>;
  @Select(CategoryState.expenseCategories)
  public expenseCategories$?: Observable<CategoryStateModel[]>;
  @Select(CategoryState.allCategories)
  public allCategories$?: Observable<CategoryStateModel[]>;

  constructor(private readonly store: Store) {}

  getCategories(url: string) {
    this.store.dispatch(new GetCategories(url));
  }

  getAllCategories() {
    this.store.dispatch(new GetAllCategories());
  }

  createCategory(url: string, category: CategoryStateModel) {
    this.store.dispatch(new CreateCategory(url, category));
  }
}
