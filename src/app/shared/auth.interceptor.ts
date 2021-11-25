import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  //HttpRequest : contains URL, headers, body, other request configurationb
  // immutable -- can't make any change
  // to make changes--- we need to CLONE the ORIGINAL request --- HttpRequest.clone
  // HttpHandler : dispatches the HttpRequest to the next handler using the method
  // HttpHandler.handle
  // The next handler could be another interceptor in the chain or the Http BackEnd
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    console.log("Intercepting here...");
    let token = sessionStorage.getItem('jwtToken');
    if(sessionStorage.getItem('username') && sessionStorage.getItem('jwtToken')){
      request=request.clone(
        {
          setHeaders:{
            Authorization: `Bearer ${token}`
          }
        })
    }
    return next.handle(request);
  }
}
