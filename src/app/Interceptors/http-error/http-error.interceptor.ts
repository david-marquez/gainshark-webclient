import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(3),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          let userMessage = 'Something went wrong, please try again';

          if(error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
          }
          else {
            // Server-side error
            if(error.status == 409) {
              userMessage = 'Username or password already exists';
            }

            errorMessage = `Error code: ${error.status} \nMessage: ${error.message};`
          }

          window.alert(userMessage);

          return throwError(errorMessage);
        })
      )
  }
}
