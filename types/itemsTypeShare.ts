type TotalCount = number;

export interface IList {
  id: number;
  images: string;
  name: string;
  price: number;
  favoriteCount: number;
}

export interface IItemList {
  totalCount: TotalCount;
  list: IList[];
}