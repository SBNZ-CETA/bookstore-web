export interface BookCreate {
  title: string;
  writer: WriterDto;
  cost: number;
  category: GenreDto;
  rating: RatingDto;
  publishDate: Date;
  releaseDate: Date;
  rateCount: number;
  new: boolean;
  popular: boolean;
  rateUnit: string;
  sellerBankAccountId: number;
}

export interface Book extends BookCreate {
  id: number;
}

export interface WriterDto {
  id: number;
  name: string;
  surname: string;
}

export interface GenreDto {
  id: number;
  name: string;
}

export interface RatingDto {
  id: number;
  user_id: number;
  book_id: number;
  rate: number;
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
  transactionDto: TransactionDto;
}

export interface TransactionDto{
  senderAccountId: number;
  receiverAccountId: number;
  amount: number;
  location: string;
  ccv: number;
  ownerName: string;
  expirationDate: Date;
}

export interface BookReview{
  bookId: number;
  rate: number;
}

export enum PaymentType{
  DELIVERY = "DELIVERY",
  CREDIT_CARD = "CREDIT_CARD"
}
