import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './model';

@Injectable({
  providedIn: 'root'
})
export class BooksServiceService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:8080/api/books';

  private readonly  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public getBooks() {
    return this.http.get<Book[]>(this.apiUrl, this.httpOptions);
  }
}
