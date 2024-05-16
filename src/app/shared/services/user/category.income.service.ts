import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryIncomeService {
  apiUrl = 'http://localhost:8080/api/v1/categories/incomes';
  private categoriesSubject = new BehaviorSubject<CategoryStateModel[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  getCategories() {
    return this.http
      .get<CategoryStateModel[]>(this.apiUrl)
      .pipe(
        map(categoryData => {
          const categories: CategoryStateModel[] = [];
          for (const key in categoryData) {
            categories.push({ colorCode: this.hexToRgbA(key), title: categoryData[key].title });
          }
          return categories;
        }),
        tap(categories => this.categoriesSubject.next(categories))
      )
      .subscribe();
  }

  createCategory(category: CategoryStateModel) {
    return this.http
      .post<CategoryStateModel>(this.apiUrl, category)
      .pipe(tap(() => this.getCategories()))
      .subscribe(response => console.log(response));
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

  constructor(private http: HttpClient) {
    this.getCategories();
  }
}
