import {Injectable, OnDestroy} from '@angular/core';
import { CategoryStateModel } from 'shared/models/category';
import { HttpClient } from '@angular/common/http';
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnDestroy {

  subscription: Subscription;

  categories: CategoryStateModel[] = []

  addCategory(category: CategoryStateModel) {
    this.categories.push(category);
  }

  deleteCategory(index: number) {
    this.categories.splice(index, 1);
  }

  getCategories() {
    return this.categories;
  }

  getColors() {
    console.log(this.categories)
    console.log(this.categories.map(category => category.color || ' '));
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

  getData() : Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/v1/categories/expenses');
  }

  constructor(private http: HttpClient) {
    this.subscription = this.getData().subscribe(response => {
      for (let key in response) {
        this.categories.push({color: this.hexToRgbA(key), title: response[key].title, data: 10});
      }
    });
    this.getColors();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
