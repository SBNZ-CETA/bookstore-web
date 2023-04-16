import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser, RegisterUser } from './model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  private readonly apiUrl = 'http://localhost:8080/api/';

  private readonly  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public registerUser(dto: RegisterUser) {
    return this.http.post<{}>(this.apiUrl+'users/register', JSON.stringify(dto), this.httpOptions);
  };

  public loginUser(dto: LoginUser) {
    return this.http.post<{}>(this.apiUrl+'login', JSON.stringify(dto), this.httpOptions);
  };
}
