import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { CategoryStateModel } from 'shared/models/category';

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    id: undefined,
    color: undefined,
    title: undefined
  }
})
@Injectable()
export class CategoryState {

}
