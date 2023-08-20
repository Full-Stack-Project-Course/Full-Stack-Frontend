import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTTokenInterceptor implements HttpInterceptor {

  constructor() {}
  token!:string
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.token = localStorage.getItem("token") || ""
    if(this.token == ""){return next.handle(request)}
    
  
    var request = request.clone({
      setHeaders:{
        "Authorization" : `Bearer ${this.token}`
      }
    })
 
    return next.handle(request);
  }
}
