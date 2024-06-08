type PaginatedResponse<T> = {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    last: boolean;
    first: boolean;
    number: number;
    size: number;
    numberOfElements: number;
    empty: boolean;
  };
};