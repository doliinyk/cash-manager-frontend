import { ExpenseRegularStateModel } from 'shared/models/regular-expense-payment';

export interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort[];
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
}

export interface ExpenseRegularPayload {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ExpenseRegularStateModel[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}
