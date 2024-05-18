import { RegularStateModel } from 'shared/models/regular-payment';

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

export interface RegularPayload {
  totalElements: number;
  totalPages: number;
  size: number;
  content: RegularStateModel[];
  number: number;
  sort: Sort[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}
