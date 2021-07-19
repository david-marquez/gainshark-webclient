import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = localStorage.getItem('access_token');

      if(accessToken) {
        let cloned = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
        });

        return next.handle(cloned);
      }
      else {
        return next.handle(request);
      }
  }
}
