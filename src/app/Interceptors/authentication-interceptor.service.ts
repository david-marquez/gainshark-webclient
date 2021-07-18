import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
      const accessToken = localStorage.getItem('access_token');

      if(accessToken) {
        const cloned = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
        });

        return next.handle(cloned);
      }
      else {
        return next.handle(request);
      }
    }
}
