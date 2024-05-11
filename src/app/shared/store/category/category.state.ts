import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { CategoryStateModel } from 'shared/models/category';

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    color: undefined,
    title: undefined,
    data: undefined,
  }
})
@Injectable()
export class CategoryState {

}
