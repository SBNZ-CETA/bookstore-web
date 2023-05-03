import { BookCategory } from "./BookCategory";

export interface BookCreate {
  title: string;
  writer: string;
  cost: number;
  category: BookCategory;
}

export interface Book extends BookCreate {
  id: number;
}
