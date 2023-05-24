import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable() 
export class TokenInterceptor implements HttpInterceptor { 
    constructor(private router: Router) { } 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = localStorage.getItem('token')
        if(token == null){
            return next.handle(request).
                pipe(catchError(err => { 
            if (err.status === 401) {
            localStorage.removeItem('token');      
            this.router.navigate(['/login']);} 
            const error = err.error.message || err.statusText; 
            return throwError(error); 
            }))
        }
        const cloned = request.clone(
            {
                setHeaders: {  
                    Authorization: `Bearer ` + token  
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