import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { IUser } from '../Interfaces/IUser';
import { User } from '../Models/User';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor() { }

  isNewUser: boolean = false;
  user:IUser = new User();

  ngOnInit(): void {
    var loginButton = document.getElementById("btn-login");
  }

  buildUser(data) {
    let nameSplit = data.value.name.split(" ");

    this.user.FirstName = nameSplit[0];
    this.user.LastName = nameSplit[1];
    this.user.Email = data.value.email;
    this.user.Username = data.value.username;
    this.user.Password = data.value.password;

    console.log(this.user);
  }

  signUp(data) {
    if(!this.isNewUser) {
      document.getElementById("name-container").hidden = false;
      document.getElementById("email-container").hidden = false;
      this.isNewUser = true;
    }
    else {
      this.buildUser(data);
    }
  }

}
