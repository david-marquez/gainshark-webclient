import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// Interfaces imports
import { IUser } from 'src/app/Interfaces/IUser';
import { IProgram } from 'src/app/Interfaces/IProgram';
import { IExercise } from 'src/app/Interfaces/IExercise';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Url declarations
  baseUrl: string = 'http://localhost:61795/api';
  exerciseUrl: string = `${this.baseUrl}/exercises`;
  programUrl: string = `${this.baseUrl}/programs`;
  userUrl: string = `${this.baseUrl}/users`;

  private handleError(error: HttpErrorResponse) {
    if(error.status == 0) {
      console.error('An error occurred: ', error.error);
    }
    else if(error.status == 401) {
      // Refresh token
      
    }
    else {
      console.error(`Error code ${error.status}, ${error.message}`);
    }

    return throwError(error);
  }

  addProgram(program: IProgram): Observable<any> {
    
    let addUri = `${this.programUrl}/add`;

    return this.http.post<any>(
      addUri, program, { observe: 'response' })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  addUser(user: IUser): Observable<any> {

    let addUri = `${this.userUrl}/add`;

    user.Password = btoa(user.Password);

    return this.http.post<any>(
      addUri, user, { observe: 'response' })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  getExercises(): Observable<HttpResponse<IExercise[]>> {

    return this.http.get<IExercise[]>(
      this.exerciseUrl, { observe: 'response' })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  getProgram(programId: number): Observable<HttpResponse<IProgram>> {

    let getUri = `${this.programUrl}/${programId}`;

    return this.http.get<IProgram>(
      getUri, { observe: 'response' })
        .pipe(
          retry(3),
          catchError(this.handleError)
        );
  }

  getUser(userName: string): Observable<HttpResponse<IUser>> {

    let getUri = `${this.userUrl}/${userName}`;

    return this.http.get<IUser>(getUri, { observe: 'response' })
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
    
  }
  
}
