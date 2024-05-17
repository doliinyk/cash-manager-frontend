export interface Category {
  title: string;
}

export interface Income {
  id: string;
  description: string;
  cost: number;
  incomeDate: string;
  category: Category;
}

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

export interface Payload {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Income[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}
