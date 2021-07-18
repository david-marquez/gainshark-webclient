import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import * as moment from 'moment';

// Interfaces imports
import { IAccessToken } from 'src/app/Interfaces/IAccessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    // Variable declarations
    let loginUrl: string = 'http://localhost:61795/api/token';
    let encodedPassword: string = btoa(password);
    let urlTokenRequest = `username=${username}&password=${encodedPassword}&grant_type=password`;

    // Set headers
    let httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    }
    
    return this.http.post<IAccessToken>(
      loginUrl, urlTokenRequest, { headers: httpOptions.headers })
        .pipe(
          tap(response => this.setSession(response)),
          shareReplay()
        )
  }

  private setSession(authResult: IAccessToken) {
    console.log(authResult);
    let expiresAt = moment().add(authResult.expires_in, 'second');

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    let expiration = localStorage.getItem('expires_at');
    let expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }
}
