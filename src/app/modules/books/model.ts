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


export interface BookOrder extends BookCreate {
  bookId: number;
  quantity: number;
} 

export interface CreateOrderDto {
  items: BookOrder;
  user: string;
  totalPrice: number;
  paymentType: PaymentType;
}

export enum PaymentType{
  DELIVERY = "DELIVERY",
  CREDIT_CARD = "CREDIT_CARD"
}