import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService 
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.authService.checkUser) {
      //клонируем запрос и добавляем заголовок, клонируем из-за того что нельзя изменять
      request = request.clone({
        setHeaders : {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
    }
    
    return next.handle(request);
  }
}
