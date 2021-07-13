import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../Models/User';
import { IUser } from '../../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserHandoffService {

  private userSource = new BehaviorSubject<IUser>(new User());
  currentUser = this.userSource.asObservable();

  constructor() { }

  changeUser(user: IUser) {
    this.userSource.next(user);
  }
  
}
