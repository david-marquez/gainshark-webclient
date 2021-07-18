import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IAccessToken } from 'src/app/Interfaces/IAccessToken';
import { AccessToken } from 'src/app/Models/AccessToken';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {

  private tokenSource = new BehaviorSubject<IAccessToken>(new AccessToken());
  currentAccessToken = this.tokenSource.asObservable();

  constructor() { }

  changeAccessToken(accessToken: IAccessToken) {
    this.tokenSource.next(accessToken);
  }

}
