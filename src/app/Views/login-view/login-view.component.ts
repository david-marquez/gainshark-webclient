import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

import { IUser } from '../../Interfaces/IUser';
import { ApiService } from '../../Services/api-service/api-service.service';
import { HttpResponse } from '@angular/common/http';
import { UserHandoffService } from 'src/app/Services/user-handoff-service/user-handoff-service.service';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';
import { IProgram } from 'src/app/Interfaces/IProgram';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  private isNewUser: boolean = false;
  user: IUser = new User();
  loginAlertMessage: string = undefined;

  constructor(private api: ApiService, 
    private router: Router, 
    private userHandoff: UserHandoffService) { }

  ngOnInit(): void {
    this.userHandoff.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  buildUser(data) {
    let nameSplit = data.value.name.split(" ");

    this.user.FirstName = nameSplit[0];
    this.user.LastName = nameSplit[1];
    this.user.Email = data.value.email;
    this.user.UserName = data.value.userName;
    this.user.Password = data.value.password;
  }

  demoLogin() {
    this.user.UserName = 'd_marquez';

    this.api.getUser(this.user.UserName)
      .subscribe(response => {
        this.processLoginResponse(response);
      });
  }

  login(data) {
    this.buildUser(data);

    this.api.loginUser(this.user.UserName, this.user.Password)
      .subscribe(response => {
        this.processLoginResponse(response);
      });
  }

  processLoginResponse(response: HttpResponse<IUser>) {
    if(response.status == 200) {
      this.userHandoff.changeUser(this.user);
      this.router.navigate([`users/${this.user.UserName}/programs`]);
    }
    else if(response.status == 401) {
      this.loginAlertMessage = 'Invalid UserName or password';
    }
    else {
      this.loginAlertMessage = 'Error logging in, please try again';
    }
  }

  signUp(data) {
    if(!this.isNewUser) {
      document.getElementById("name-container").hidden = false;
      document.getElementById("email-container").hidden = false;
      this.isNewUser = true;
    }
    else {
      this.buildUser(data);

      this.user.Role = new Role();
      this.user.Role.Id = 1;

      this.user.Programs = new Array<IProgram>();

      // Do sign up stuff
      this.api.addUser(this.user)
        .subscribe(response => {
          if(response.status == 409) {
            this.loginAlertMessage = 'Account already exists';
          }
          else {
            this.processLoginResponse(response);
          }
        });
    }
  }

}
