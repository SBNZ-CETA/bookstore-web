import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookOrder, CheckoutDto } from './model';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:8080/api/order';

  private readonly  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public orderBook(price: number, id: number, books: BookOrder[]) {
    return this.http.post<CheckoutDto>(this.apiUrl+'/checkout', JSON.stringify({totalPrice: price, orderItems:books, userId: id}), this.httpOptions);
  }
}
