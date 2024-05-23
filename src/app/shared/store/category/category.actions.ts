import { CategoryStateModel } from 'shared/models/category';

export class GetCategories {
  static readonly type = '[categories] get';

  constructor(public url: string) {}
}

export class GetAllCategories {
  static readonly type = '[categories] get all';
}

export class CreateCategory {
  static readonly type = '[category] create';

  constructor(
    public url: string,
    public category: CategoryStateModel
  ) {}
}

export class DeleteCategory {
  static readonly type = '[category] delete';

  constructor(
    public url: string,
    public category: CategoryStateModel
  ) {}
}
