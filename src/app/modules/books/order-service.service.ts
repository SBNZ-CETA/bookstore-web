import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookOrder, CreateOrderDto, PaymentType } from './model';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:8080/api/order';

  private readonly  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public checkout(price: number, name: string, books: BookOrder[], type: PaymentType) {
    return this.http.post<CreateOrderDto>(this.apiUrl+'/checkout', JSON.stringify({totalPrice: price, orderItems:books, user: name, paymentType: type}), this.httpOptions);
  }

  public createOrder(order: any) {
    return this.http.post<CreateOrderDto>(this.apiUrl, JSON.stringify(order), this.httpOptions);
  }
}
