export interface BookCreate {
  title: string;
  writer: string;
  cost: number;
}

export interface Book extends BookCreate {
  id: number;
}


export interface BookOrder extends Book {
  quantity: number;
} 

export interface CheckoutDto {
  items: BookOrder;
  userid: number;
  discountedPrice: number;
}