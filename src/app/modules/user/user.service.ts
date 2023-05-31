import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JWTResponse, LoginUser, RegisterUser } from './model';
import jwtDecode from 'jwt-decode';
import { GenreDto } from '../books/model';

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
    return this.http.post<JWTResponse>(this.apiUrl+'auth', JSON.stringify(dto), this.httpOptions);
  };

  public getGenres() {
    return this.http.get<GenreDto[]>(this.apiUrl + 'genres', this.httpOptions);
  };

  public getUsername():string{
    const jwt:any=localStorage.getItem('token');
    const decoded:any = jwtDecode(jwt);
    return decoded['sub']
  }

}
