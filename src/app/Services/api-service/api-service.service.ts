import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { IUser } from 'src/app/Interfaces/IUser';
import { IProgram } from 'src/app/Interfaces/IProgram';
import { IExercise } from 'src/app/Interfaces/IExercise';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUri: string = 'http://localhost:61795/api';
  exerciseUri: string = `${this.baseUri}/exercises`;
  programUri: string = `${this.baseUri}/programs`;
  userUri: string = `${this.baseUri}/users`;
  

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
    // TODO: Move token from user+pass to auth token handoff service
    return btoa(`${username}:${password}`);
  }

  addProgram(program: IProgram): Observable<any> {
    // Token creation
    // let token = doWork();
    
    let addUri = `${this.programUri}/add`;

    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        //.set('Authorization', `Basic ${token}`)
    }

    return this.http.post<any>(
      addUri, program, { observe: 'response', headers: httpOptions.headers })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  addUser(user: IUser): Observable<any> {
    // Token creation
    // let token = doWork();

    let addUri = `${this.userUri}/add`;

    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        //.set('Authorization', `Basic ${token}`)
    }

    user.Password = btoa(user.Password);

    return this.http.post<any>(
      addUri, user, { observe: 'response', headers: httpOptions.headers })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  getExercises(): Observable<HttpResponse<IExercise[]>> {
    // Token creation
    // let token = doWork();

    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        //.set('Authorization', `Basic ${token}`)
    }

    return this.http.get<IExercise[]>(
      this.exerciseUri, { observe: 'response', headers: httpOptions.headers })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  getProgram(programId: number, userName: string, password: string): Observable<HttpResponse<IProgram>> {
    
    //let token = this.createToken(userName, password);
    
    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        //.set('Authorization', `Basic ${token}`)
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
        //.set('Authorization', `Basic ${token}`)
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
