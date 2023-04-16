import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable() 
export class TokenInterceptor implements HttpInterceptor { 
    constructor(private router: Router) { } 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloned = request.clone(
            {
                setHeaders: {  
                    Authorization: `Bearer ${localStorage.getItem('token')}`  
                }  
            }
        );
        return next.handle(cloned).
            pipe(catchError(err => { 
        if (err.status === 401) {
          localStorage.removeItem('token');      
          this.router.navigate(['/login']);} 
          const error = err.error.message || err.statusText; 
          return throwError(error); 
        }))
    } 
}