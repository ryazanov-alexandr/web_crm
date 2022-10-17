import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class LogoutInterceptor implements HttpInterceptor {

  private returnUrl:string = "/login";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let observable = new Observable<HttpEvent<any>>((subscriber) => {
      //отслеживаем сосотояние запроса
      let originalRequestSubscription = next.handle(request)//передаем запрос след интерцептору, а то что возвращается помещаем в переменную
        .subscribe((response) => {
          subscriber.next(response);
        },
        //отслеживание ошибок ответа
        (err) => {
          if(err.status === 401) {
            this.authService.logout();
            this.router.navigate(this.redirectTo());
            subscriber.error("Not Authorize");
          } else {
            subscriber.error(err);
          }
        },
        () => {
          subscriber.complete();//завершаем запрос
        });

        return () => {
          originalRequestSubscription.unsubscribe();//отписываемся
        };
    });

    return observable;
  }

  redirectTo() : any[] {
    return [this.returnUrl];
  }
}
