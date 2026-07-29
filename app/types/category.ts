export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  children: Category[];
}

export interface CategoryResponse {
  data: Category[];
}