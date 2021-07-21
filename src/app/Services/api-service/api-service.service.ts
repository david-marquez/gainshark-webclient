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

  // Add item methods

  addProgram(program: IProgram): Observable<any> {
    let addUrl = `${this.programUrl}/add`;

    return this.http.post<any>(addUrl, program, { observe: 'response' });
  }

  addUser(user: IUser): Observable<any> {
    let addUrl = `${this.userUrl}/add`;

    return this.http.post<any>(addUrl, user, { observe: 'response' });
  }

  // Delete item methods

  deleteProgram(programId: number): Observable<any> {
    let deleteUrl = `${this.programUrl}/delete/${programId}`;

    return this.http.post<any>(deleteUrl, programId, { observe: 'response' });
  }

  // Get item methods

  getExercises(): Observable<HttpResponse<IExercise[]>> {
    return this.http.get<IExercise[]>(this.exerciseUrl, { observe: 'response' });
  }

  getProgram(programId: number): Observable<HttpResponse<IProgram>> {
    let getUrl = `${this.programUrl}/${programId}`;

    return this.http.get<IProgram>(getUrl, { observe: 'response' });
  }

  getUser(userName: string): Observable<HttpResponse<IUser>> {
    let getUrl = `${this.userUrl}/${userName}`;

    return this.http.get<IUser>(getUrl, { observe: 'response' });
  }

  // Update item methods

  updateProgram(program: IProgram): Observable<any> {
    let updateUrl = `${this.programUrl}/update`;

    return this.http.post<any>(updateUrl, program, { observe: 'response' });
  }
  
}
