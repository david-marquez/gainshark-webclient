import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { IUser } from 'src/app/Interfaces/IUser';
import { IProgram } from 'src/app/Interfaces/IProgram';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUri: string = 'http://localhost:61795/api';
  userUri: string = `${this.baseUri}/users`;
  programUri: string = `${this.baseUri}/programs`;

  private handleError(error: HttpErrorResponse) {
    if(error.status == 0) {
      console.error('An error occurred: ', error.error);
    }
    else {
      console.error(`Error code ${error.status}, ${error.message}`);
    }

    return throwError('Encountered an error, please try again later');
  }

  private createToken(username: string, password: string) {
    return btoa(`${username}:${password}`);
  }

  addUser(user: IUser): Observable<any> {
    let addUri = `${this.userUri}/add`;

    user.Password = btoa(user.Password);

    return this.http.post<any>(
      addUri, user, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getProgram(programId: number, userName: string, password: string): Observable<HttpResponse<IProgram>> {
    
    let token = this.createToken(userName, password);
    
    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Basic ${token}`)
    }

    let getUri = `${this.programUri}/${programId}`;

    return this.http.get<IProgram>(
      getUri, { observe: 'response', headers: httpOptions.headers})
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  getUser(userName: string): Observable<HttpResponse<IUser>> {
    
    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    }

    let getUri = `${this.userUri}/${userName}`;
    
    return this.http.get<IUser>(
      getUri, { observe: 'response', headers: httpOptions.headers })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  loginUser(userName: string, password: string): Observable<HttpResponse<IUser>> {
    
    let token = this.createToken(userName, password);

    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Basic ${token}`)
    }

    let loginUri = `${this.userUri}/login/${userName}`;

    return this.http.get<IUser>(
      loginUri, { observe: 'response', headers: httpOptions.headers })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }
}
