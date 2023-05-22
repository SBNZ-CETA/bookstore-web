import { BookCategory } from "./BookCategory";

export interface BookCreate {
  title: string;
  writer: string;
  cost: number;
  category: BookCategory;
  rating: number;
  publishDate: Date;
  releaseDate: Date;
  rateCount: number;
  new: boolean;
  popular: boolean;
  rateUnit: string;
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
  username: string;
  totalPrice: number;
  paymentType: PaymentType;
}

export interface BookReview{
  bookId: number;
  rate: number;
}

export enum PaymentType{
  DELIVERY = "DELIVERY",
  CREDIT_CARD = "CREDIT_CARD"
}