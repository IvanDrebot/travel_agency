import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private notif: NotificationsService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const localToken: string = localStorage.getItem('token');
    const sessionToken: string = sessionStorage.getItem('token');
    if (localToken || sessionToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionToken || localToken}`,
          'Content-Type': 'application/json',
        },
      });
    }
    return new Observable<HttpEvent<any>>((subscriber) => {
      const originalRequestSubscription = next.handle(request).subscribe(
        (response: any) => {
          subscriber.next(response);
        },
        (err) => {
          if (err.status === 401) {
            localStorage.clear();
            // this.notif.error('You are not authorized', err.error.title, {
            //   timeOut: 3000,
            // });
            this.router.navigate(['/login']);
          } else {
            // this.notif.error(err.error.title);
          }
          subscriber.error(err);
        },
        () => subscriber.complete()
      );
      return () => originalRequestSubscription.unsubscribe();
    });
  }
}
