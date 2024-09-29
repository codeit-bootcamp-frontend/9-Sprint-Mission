export interface Query {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

export interface QueryContextType {
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
}
