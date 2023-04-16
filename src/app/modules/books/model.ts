export interface BookCreate {
  title: string;
  writer: string;
  cost: number;
}

export interface Book extends BookCreate {
  id: number;
}
