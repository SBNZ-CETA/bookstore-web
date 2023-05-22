import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, BookCreate, BookOrder, BookReview } from './model';

@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:8080/api';

  private readonly  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public getBooks() {
    return this.http.get<Book[]>(this.apiUrl+'/books', this.httpOptions);
  }

  public createBook(book: BookCreate) {
    return this.http.post<{}>(this.apiUrl+'/books', JSON.stringify(book), this.httpOptions);
  }

  public rateBook(book: any) {
    return this.http.post<BookReview>(this.apiUrl+'/review', JSON.stringify(book), this.httpOptions);
  }

  public getRecommendedBooksUnauthorized(){
    return this.http.get<BookOrder[]>(this.apiUrl+'/recommend-unauthorized', this.httpOptions);
  }
}
