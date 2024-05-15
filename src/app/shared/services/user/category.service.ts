import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = 'http://localhost:8080/api/v1/categories/expenses';

  getCategories() {
    return this.http.get<CategoryStateModel[]>(this.apiUrl);
  }

  createCategory(category: CategoryStateModel): Observable<CategoryStateModel> {
    return this.http.post<CategoryStateModel>(this.apiUrl, category);
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

  constructor(private http: HttpClient) {}
}
